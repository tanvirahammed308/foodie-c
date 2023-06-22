import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";


const CheckoutForm = ({cart,price}) => {
    const stripe = useStripe();
    const elements = useElements();
    const {user}= useAuth();
    const [axiosSecure]= useAxiosSecure();
    const [cardError,setCardError]=useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [processing,setProcessing]=useState(false);
    const [transactionId,setTransactionId]= useState('')
    useEffect(() => {
      // console.log(price);
      if (price > 0 ) {
        axiosSecure.post("/create-payment-intent",{price})
    .then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret)
    })
      }
      
     
  }, [price,axiosSecure]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        
    if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
      const card = elements.getElement(CardElement);
      if (card == null) {
        return;
      }
    //   console.log('card',card);
    const {error} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
      if (error) {
        console.log('error', error);
        setCardError(error.message)
      } else {
        setCardError('')
        // console.log('PaymentMethod', paymentMethod);
      }
      setProcessing(true)
      // console.log(46,clientSecret);
      const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || 'unkown',
              name: user?.displayName || 'anonymous',
            },
          },
        },
      );
      if (confirmError) {
        console.log(confirmError);
        
      }
      console.log('payment intend',paymentIntent);
      setProcessing(false)
      if (paymentIntent.status=== "succeeded") {
        setTransactionId(paymentIntent.id)
        const transactionId= paymentIntent.id;
        const payment={email: user?.email, transactionId,price,
          date: new Date(),
        quantity:cart.length,
        cartItems: cart.map(item=>item._id),
        menuItems : cart.map(item=>item.menuItemId),
        status:'service pending',
        itemName: cart.map(item=>item.name)
        
        }
        axiosSecure.post('/payments',payment)
        .then(res=>{
          console.log(res.data);
          if (res.data.result.insertedId) {
            // display confirm 
            
          }
        })
      }
    };
    return (
        <>
           <form onSubmit={handleSubmit} className="w-2/3 m-8">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe || !clientSecret || processing}  className="btn btn-outline btn-primary btn-sm mt-4">
        Pay
      </button>
    </form>
    {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    {transactionId && <p className="text-green-600">Transaction complete with transactionId {transactionId}</p>}
        </>
     
    );
};

export default CheckoutForm;