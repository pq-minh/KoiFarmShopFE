// eslint-disable-next-line no-unused-vars
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; 
import Home from "./page/home";
import Login from "./page/login";
import Dashboard from "./page/admin";
import PrivateRoute from "./component/private-route";
import Register from "./page/register";
import FishMenu from "./page/fish"; 
import ServiceMenu from "./page/service"; 
import UserInfor from "./page/user-infor/user"
import KoiAssigment from "./page/koi-assigment/index";
import StaffPage from "./page/staff/staff";
import Shop from "./page/shop/Shop";
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
      path: "service/cleaning",
      element: <ServiceMenu />,
    },
    {
      path: "service/maintenance",
      element: <ServiceMenu />,
    },       
    {
      path: "koi-assigment",
      element: <KoiAssigment/>
    },{
      path: "staff",
      element: <PrivateRoute allowedRoles={['Staff']} />, 
      children: [
        {
          path: "",
          element: <StaffPage />,
        }
      ]
    }
  ]);

  return (
    <GoogleOAuthProvider clientId="481272321702-aj712402ov128i3tupa7bd1g55fg9uie.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
};

export default App;
