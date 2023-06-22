import { NavLink, Outlet } from "react-router-dom";
import {
  FaShoppingCart,
  FaWallet,
  FaCalendarAlt,
  FaHome,
  FaUtensils,
  FaBook,
  
  FaUsers,
} from "react-icons/fa";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const Dashbord = () => {
  // ex 
  const {loading}=useAuth()
  //
  const [cart] = useCart();
  // const isAdmin=true;
  const [isAdmin]=useAdmin();
  console.log(isAdmin);
  // extra 
  if (loading) {
    return <h1>loading</h1>
  }
  //
  return (
    <div className="drawer drawer-mobile ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      {/* <div className="drawer-content flex flex-col items-center justify-normal"> */}
      <div className="drawer-content ">
        
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side bg-[#D1A054]">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 ">
          {
            isAdmin ? <>
            
            <li>
            <NavLink to='/dashbord/adminhome'>
             
              <FaHome />
              Admin Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashbord/additem'>
            
              <FaUtensils />
             Add an Item
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashbord/manageitems'>
              
              <FaWallet />
             Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashbord/paymenthistory'>
              
              <FaBook />
             Manage Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashbord/allusers'>
              
              <FaUsers />
            All Users
            </NavLink>
          </li>
         
            
            </>:<>
            
            <li>
            <NavLink to='/dashbord/userhome'>
             
              <FaHome />
              User Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashbord/reservations'>
            
              <FaCalendarAlt />
              Reservations
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashbord/paymenthistory'>
              
              <FaWallet />
              Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashbord/mycart'>
             
              <FaShoppingCart />
              My Cart
            <div className="badge badge-secondary">+{cart?.length || 0}</div>
            </NavLink>
          </li>
            
            
            </>
          }
          
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">Our Menu</NavLink>
          </li>

          <li>
            <NavLink to="/order/salad">Order Food</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashbord;
