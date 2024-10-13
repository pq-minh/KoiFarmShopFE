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
import BatchKoi from "./page/fish/batch";
import AllProduct from "./page/fish/allproduct";

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
      path: "register",
      element: <Register />,
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
      path: "service/maintenance",
      element: <ServiceMenu />,
    },   
    {
      path: "allproduct",
      element: <AllProduct />
    }    
      
  ]);

  return (
    <GoogleOAuthProvider clientId="481272321702-aj712402ov128i3tupa7bd1g55fg9uie.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
};

export default App;
