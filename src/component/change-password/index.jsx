
import React, { useState } from "react";
import "./index.scss";
import { Button, Form, Input, Row, Col } from "antd";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
function ChangePassword(){
  const navigate = useNavigate();
  const [errors, SetErrors] = useState([]);
  const [oldpass,SetOldpass] = useState();
  const addError = (newError) => {
    // Cập nhật state bằng cách thêm lỗi mới vào mảng hiện tại
    SetErrors((prevErrors) => [...prevErrors, ...(Array.isArray(newError) ? newError : [newError])]);
  };
    const handleChangePassword = async (values) => {
        console.log(values);      
        try {     
          const response = await api.post("user/changepassword", values);
          if (response.status === 200) {
              // Handle success
              alert("Password changed successfully!");      
              handleLogout();        
          }
      } catch (err) {
          // Improved error handling
          if (err.response) {
              console.log(err.response.data); // Log error details for debugging
              addError(err.response.data.errors.NewPassword);
              console.log(err.response.data.errors.NewPassword); //); 
              alert(err.response.data.message || "An error occurred while changing the password.");
          } else if (err.request) {
              console.log(err.request);
              alert("No response from server. Please try again.");
          } else {
              console.log('Error', err.message);
              alert("An unexpected error occurred. Please try again.");
          }
      }
      };
      const handleLogout = async () => {
        
        try {
          const response = await api.post("user/logout");
          if (response.status === 200) {
              alert("Logged out successfully!");
              navigate("/"); // Redirect đến trang đăng nhập
          } else {
              alert("Unexpected response from server.");
          }
      } catch (err) {
        SetOldpass(err.response?.data?.message || "Logout failed.");
      }
      }
    return(
        <div className="cpass-form">
        <Form
            className="form"
            labelCol={{
              span: 24,
            }}
            onFinish={handleChangePassword}
          >
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "1.5rem",
                color: "#333",
              }}
            >
              Change Your Password
            </div>

            
            <Row gutter={20}>
              <Col span={20}>
                <Form.Item
                  label="Old Password"
                  name="oldpassword"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your old password",
                    },
                  ]}
                >
                  <Input style={{ width: '100%', fontSize: '16px' }} type="Password" placeholder="Old Password"  />
                </Form.Item>
              </Col>      
            </Row>
            {
              oldpass === null ? (
            <p>No old password provided.</p>
            ) : (
            <p>{oldpass}</p>
             )}     
            
            <Row gutter={20}>
              <Col span={20}>
                <Form.Item
                  label="New Password"
                  name="newpassword"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a new password",
                    },
                  ]}
                >
                  <Input style={{ width: '100%', fontSize: '16px' }} type="password" placeholder="New Password" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={20}>
              <Col span={20}>
                <Form.Item
                  label="Confirm Password"
                  name="confirmpassword"
                  rules={[
                    {
                      required: true,
                      message: "Please enter confirm password",
                    },
                  ]}
                >
                  <Input style={{ width: '100%', fontSize: '16px' }} type="password" placeholder="Confirm Password" />
                </Form.Item>
              </Col>
            </Row>
            
             <div>
             {errors.map((item) => (
              <li key={item} style={{color:'red', fontSize: '13px'}}>  {"*"+item}  <br /></li>
            ))}            
             </div>     
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Change Password
              </Button>
            </Form.Item>

            
          </Form>
       </div> 
    )
}
export default ChangePassword