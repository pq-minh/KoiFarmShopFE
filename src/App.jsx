// eslint-disable-next-line no-unused-vars
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; 
import Home from "./page/home";
import Login from "./page/login";
// import Dashboard from "./page/admin";
import PrivateRoute from "./component/private-route";
import Register from "./page/register";
import SingleKoi from "./page/fish/single"; 
import ServiceMenu from "./page/service"; 
import UserInfor from "./page/user-infor/user"
import KoiAssigment from "./page/koi-assigment/index";
import StaffPage from "./page/staff/staff";
import Shop from "./page/shop/Shop";
import BatchKoi from "./page/fish/batch";
import AllProduct from "./page/fish/allproduct";
import AssignmentHistory from "./page/assigmentHistory/AssigmentHistory";
import UserCart from "./page/usercart/UserCart";
import CheckOut from "./page/checkout/CheckOut";
// import OrderHistory from "./page/order/OrderHistory";
import OrderHistoryPage from "./page/orderhistory/index";
import Details from "./page/productdetails/Details";
import ProductDetails from "./component/shop-component/product-cart-details/ProductDetails";
// import OrderHistoryPage from "./page/orderhistory";
import CheckOutComplete from "./component/shopping-cartCP/CheckoutComplete/CheckoutComplete"
import Comparison from "./component/comparison/Comparison";
import ErrorPayment from "./page/errorPayment/ErrorPayment";
import CompletePayment from "./page/completePayment/CompletePayment";
import Dashboard from "./page/Dashboard";
import ViewKoi from "./page/Dashboard/Viewkoi";
import UpdateKoi from "./page/Dashboard/Viewkoi/UpdateKoi";
import AddKoi from "./page/Dashboard/Viewkoi/AddKoi";
import OrderChart from "./page/Dashboard/Chart/order";
import ViewBatchKoi from "./page/Dashboard/Batchkoi";
import UpdateBatchKoi from "./page/Dashboard/Batchkoi/updateBatchKoi";
import AddBatchKoi from "./page/Dashboard/Batchkoi/addBatchKoi";
import RequestCare from "./page/request-care";
import RevenueChart from "./page/Dashboard/Chart/revenue";
import ForgotPasswordPage from "./page/forgotpassword/Forgot-Password";
import ConfirmPasswordPage from "./page/confirmpasswordpage/ConfirmPasswordPage";
import Post from "./page/post/Post";
import Policy from "./page/policy/Policy";
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
    // {
    //   path: "admin",
    //   element: <PrivateRoute />, 
    //   children: [
    //     {
    //       path: "dashboard",
    //       element: <Dashboard />, 
    //     },
    //   ],
    // },
    {
      path: "admin",
      element: <Dashboard />,
      children: [
            {
              path: "/admin/viewkoi",
              element: <ViewKoi />, 
            },
            {
              path: "/admin/updatekoi/:id",
              element: <UpdateKoi />, 
            },
            {
              path: "/admin/addkoi",
              element: <AddKoi/>,
            },
            {
              path: "/admin/report",
              element: <OrderChart/>
            },
            {
              path: "/admin/revenue",
              element: <RevenueChart />
            },
            {
              path: "/admin/batchkoi",
              element :<ViewBatchKoi/>
            },
            {
              path: "/admin/updatebatchkoi/:id",
              element : <UpdateBatchKoi/>
            },
            {
              path: "/admin/addbatchkoi",
              element: <AddBatchKoi/>
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
    {
      path: "details/:id", 
      element: <ProductDetails />,
    },
    {
      path: "orderhistory",
      element: <OrderHistoryPage />,
    },
    {
      path: "checkoutcomplete",
      element: <CheckOutComplete />
    },   
    {
      path: "comparison",
      element: <Comparison/>
    },
    {
      path: "errorpayment",
      element: <ErrorPayment/>
    },
    {
      path: "completepayment",
      element: <CompletePayment/>
    },
    {   
      path: "requestcare",
      element: <RequestCare />
    }   
    ,
    {   
      path: "forgotpassword",
      element: <ForgotPasswordPage />
    } 
    ,
    {   
      path: "confirmpassword",
      element: <ConfirmPasswordPage />
    },
    {
      path: "posteditor",
      element: <Post />
    },
    {
      path: "policy",
      element: <Policy />
    }
  ]);      
  return (
    <GoogleOAuthProvider clientId="58740703879-3s8ddc1rno4kavb9neslns90iphlps9g.apps.googleusercontent.com">
      <RouterProvider router={router} />     
    </GoogleOAuthProvider>
    
  );
};

export default App;
