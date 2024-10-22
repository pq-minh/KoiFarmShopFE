// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button, Form, Input, Row, Col } from "antd";
import "./index.scss";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    console.log(values);

    try {     
      const response = await api.post("user/register", values);
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data));
      alert("Registration successful!");
      navigate("/login"); 
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.8) 100%), url('https://i.pinimg.com/736x/2d/37/d7/2d37d762eef3ccf3308782909b340129.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      ></div>

      <div className="register__form" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="form-wrapper"
          style={{
            width: "500px",
            padding: "30px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Form
            className="form"
            labelCol={{
              span: 24,
            }}
            onFinish={handleRegister}
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
              Register to KOIFARMSHOP
            </div>

            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your first name!",
                    },
                  ]}
                >
                  <Input type="text" placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
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
                  rules={[
                    {
                      required: true,
                      message: "Please enter a email!",
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

            
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password!",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Password" />
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your address!",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Address" />
                </Form.Item>
              </Col> */}
            </Row>

            
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Confirm Password"
                  name="Confirmpassword"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Confirm Password!",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Confirm password" />
                </Form.Item>
              </Col>
            </Row>

            
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Register
              </Button>
            </Form.Item>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <span style={{ marginRight: "5px", color: "#555" }}>
                Already have an account?
              </span>
              <a
                href="/login"
                style={{
                  color: "#1890ff",
                  fontWeight: "bold",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Login
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
