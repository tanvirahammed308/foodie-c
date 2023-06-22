import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";


const FoodCard = ({item}) => {
    const {name,recipe,image,price,_id}=item;
    const {user}=useContext(AuthContext);
    const [,refetch]=useCart();
    const navigate=useNavigate();
    const location=useLocation();
    const handleAddToCart=(item)=>{
      console.log(item);
      if (user && user.email) {
        const cartItem={menuItemId:_id,name,price,image,email: user.email}
        fetch("https://bistro-boss-server-eight-zeta.vercel.app/carts",{
          method:"POST",
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(cartItem)
        })
        .then(res=>res.json())
        .then(data=>{
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Food Added On the Cart',
              showConfirmButton: false,
              timer: 1500
            })
            
          }
        })
        
      }
      else{
        Swal.fire({
          title: 'Please Login To Order The Food',
         
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Login Now!'
        }).then((result) => {
          if (result.isConfirmed) {
           navigate('/login',{state:{from:location}})
          }
        })
      }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={image} alt="Shoes" /></figure>
        <p className="bg-slate-900 text-white absolute ">{price}</p>
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button onClick={()=>handleAddToCart(item)} className="  btn btn-outline border-0 border-b-4 mt-4 bg-slate-700 text-white border-orange-400">Add To Cart</button>
          </div>
        </div>
      </div>
    );
};

export default FoodCard;