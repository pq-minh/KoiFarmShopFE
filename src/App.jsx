// eslint-disable-next-line no-unused-vars
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; 
import Home from "./page/home";
import Login from "./page/login";
import Dashboard from "./page/admin";
import PrivateRoute from "./component/private-route";
import Register from "./page/register";
import SingleKoi from "./page/fish/single"; 
import ServiceMenu from "./page/service"; 
import UserInfor from "./page/user-infor/user"
import KoiAssigment from "./page/koi-assigment/index";
import StaffPage from "./page/staff/staff";
import Shop from "./page/shop/shop";
import Details from "./page/productdetails/Details";
import BatchKoi from "./page/fish/batch";
import AllProduct from "./page/fish/allproduct";
import ProductDetails from "./component/shop-component/product-cart-details/ProductDetails";

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
      element: <Dashboard />, 
      // children: [
      //   {
      //     path: "dashboard",
      //     element: <Dashboard />, 
      //   },
      // ],
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
      element: <KoiAssigment/>
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
    } ,   
    {
      path: "details/:id", 
      element: <ProductDetails />,
    }
    
  ]);

  return (
    <GoogleOAuthProvider clientId="481272321702-aj712402ov128i3tupa7bd1g55fg9uie.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
};

export default App;
