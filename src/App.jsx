// eslint-disable-next-line no-unused-vars
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; 
import Home from "./page/home";
import Login from "./page/login";
import Dashboard from "./page/admin";
import PrivateRoute from "./component/private-route";
import Register from "./page/register";
import SingleKoi from "./page/fish/Single"; 
import ServiceMenu from "./page/service"; 
import UserInfor from "./page/user-infor/user"
import KoiAssigment from "./page/koi-assigment/index";
import StaffPage from "./page/staff/staff";
import Shop from "./page/shop/Shop";
import Details from "./page/productdetails/Details";
import BatchKoi from "./page/fish/batch";
import AllProduct from "./page/fish/allproduct";
import AssignmentHistory from "./page/assigmentHistory/assigmenthistory";
import UserCart from "./page/usercart/UserCart";
import CheckOut from "./page/checkout/CheckOut";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "admin",
      element: <PrivateRoute />, 
      children: [
        {
          path: "dashboard",
          element: <Dashboard />, 
        },
      ],
    },
    {
      path: "userinfor",
      element: <UserInfor />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "shop", 
      element: <Shop />,
    },
    {
      path: "/fish/single", 
      element: <SingleKoi />,
    },
    {
      path: "/fish/batch",
      element: <BatchKoi/>
    },
    {
      path: "service/cleaning",
      element: <ServiceMenu />,
    },
    {
      path: "details",
      element: <Details/>,
    },
    {
      path: "service/maintenance",
      element: <ServiceMenu />,
    },       
    {
      path: "koi-assigment",
      element: <KoiAssigment/>
    },
    {
      path: "assigment-history",
      element: <AssignmentHistory/>
    },
    {
      path: "staff",
      element: <PrivateRoute allowedRoles={['Staff']} />, 
      children: [
        {
          path: "",
          element: <StaffPage />,
        }
      ]
    },   
    {
      path: "allproduct",
      element: <AllProduct />
    }
    ,   
    {
      path: "cart",
      element: <UserCart />
    },   
    {
      path: "checkout",
      element: <CheckOut />
    },  
  ]);

  return (
    <GoogleOAuthProvider clientId="58740703879-3s8ddc1rno4kavb9neslns90iphlps9g.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
};

export default App;
