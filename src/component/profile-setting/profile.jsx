// eslint-disable-next-line no-unused-vars
import React from "react";
import "./index.scss";
import { Button, Form, Input, Row, Col } from "antd";
import api from "../../config/axios";
function ProFile({userData}) {
    const handleChange = async (values) => {
        console.log(values);    
        /* sau khi cập nhật thành công infor thì lấy đổi token mới sau đó reload lại trang */
        try {     
          const response = await api.patch("user/update", values);
          if(response.status === 200) {
            localStorage.setItem("token", response.data.token);
            window.location.reload();
          }
        } catch (err) {
            console.log(err);
        }
      };
    return (
       <div>
        <Form
            className="form"
            labelCol={{
              span: 24,
            }}
            onFinish={handleChange}
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
              Your Profile
            </div>

            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  initialValue={userData?.FirstName}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your first name!",
                    },
                  ]}
                >
                  <Input type="text" placeholder="First Name"  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  initialValue={userData?.LastName}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your last name!",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Last Name" />
                </Form.Item>
              </Col>
            </Row>

            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  initialValue={userData?.Email}
                  rules={[
                    {
                      required: true,
                      message: "Please enter a username!",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  initialValue={userData?.PhoneNumber}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Phone Number",        
                    },
                  ]}
                >
                  <Input type="phone" placeholder="phoneNumber" />
                </Form.Item>
              </Col>
            </Row>

            
            
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Change
              </Button>
            </Form.Item>

            
          </Form>
       </div> 
    )
}
export default ProFile;