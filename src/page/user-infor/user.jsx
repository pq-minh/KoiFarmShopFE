import React from "react";
import "./index.scss";
import Header from "../../component/header";
import Profile from "../../component/profile-setting/profile";
import ChangePassword from "../../component/change-password/index";
import Address from "../../component/address/index";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";

import { List } from "antd";
const UserInfor = () => {
  const ListAction = [
    "ProFile",
    "Shipping Addresses",
    "My Cart",
    "Change Password",
    "Order List",  
  ];
  const [wizard, setWizard] = useState(ListAction[0]);

  /* set token after fetch API */
  const [token, setToken] = useState();
  const [roleuser,setRole] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    if (storedToken) {
      try {
        const decodedData = jwtDecode(storedToken);
        setUserData(decodedData);
        setRole(decodedData.role);
        console.log(decodedData);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);
  /* decode token to user profile */
  return (
    <div>
    <Header />
      {userData ? (
        <div className="row main-container ">
          <div style={{display:"flex"}}>
            <div className="col-6 list-rq">
              <div className="author-card pb-3">
                <div
                  className="author-card-cover"
                  style={{
                    backgroundImage:
                      "url(https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg)",
                  }}
                >
                  <a
                    className="btn btn-style-1 btn-white btn-sm"
                    href="#"
                    data-toggle="tooltip"
                    title="You currently have 290 Reward points to spend"
                  >
                    <i className="fa fa-award text-md"></i>&nbsp;
                    {userData.Points != "" ? 0 : 123} points
                  </a>
                </div>
                <div className="author-card-profile">
                  <div className="author-card-avatar">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="Daniel Adams"
                    />
                  </div>
                  <div className="author-card-details">
                    <h5 className="author-card-name text-lg">
                      {userData.FirstName + " " + userData.LastName}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="wizard">
              {/* duyệt qua list để lấy ra action  */}
                <nav className="list-group list-group-flush">
                  {ListAction.map((item) => (
                    <a key={item.id} className="list-group-item" href="#" style={wizard === item ?{
                          color: "red"
                    }:{}} onClick={() => setWizard(item)}>
                      <i className="fa fa-map-marker text-muted" ></i> {item}
                    </a>  
                  ))}
                </nav>
              </div>
            </div>
            {/* đang ở action nào thì lấy ra form đó  */}
            <div className="col-md-6 update-form ">
                  { wizard === "ProFile" ? (
                    <Profile userData={userData} className='col-8' />
                    ) :  wizard === "Change Password" ?(
                    <ChangePassword/>
                   ) : wizard === "Shipping Addresses" ?(
                    <Address/>
                   ) : wizard === "Manager Assigment"(

                   )
                  }
              
            </div>
          </div>
        </div>
      ) : (
        <h1>Some Thing is error, Please login again</h1>
      )}
    </div>
  );
};
export default UserInfor;
