import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRote from "./PrivateRote";
import Secret from "../pages/shared/Secret/Secret";
import Dashbord from "../layouts/Dashbord";
import Mycart from "../pages/Dashbord/Mycart/Mycart";
import AllUsers from "../pages/Dashbord/allusers/AllUsers";
import AddItem from "../pages/Dashbord/additem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashbord/manageitems/ManageItems";
import Payment from "../pages/Dashbord/Payment/Payment";
import UserHome from "../pages/Dashbord/UserHome/UserHome";
import AdminHome from "../pages/Dashbord/AdminHome/AdminHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order/:category",
        element: <Order />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "secret",
        element: (
          <PrivateRote>
            <Secret></Secret>
          </PrivateRote>
        ),
      },
    ],
  },
  
  {
    path: "dashbord",
    element: <PrivateRote><Dashbord /></PrivateRote>,
    
    children: [
      {
        path: "userhome",
        element: <UserHome />,
      },
      {
        path: "mycart",
        element: <Mycart />,
      },
      {
        path: "payment",
        element: <Payment/>,
      },
      // admin route 
      {
        path: "adminhome",
        element:<AdminRoute> <AdminHome /></AdminRoute>,
      },
      {
        path: "allusers",
        element:<AdminRoute> <AllUsers /></AdminRoute>,
      },
      {
        path: "additem",
        element: <AdminRoute><AddItem /></AdminRoute>,
      },
      {
        path: "manageitems",
        element: <AdminRoute><ManageItems></ManageItems></AdminRoute>,
      },
    ],
  },
]);

