// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Button, Form, Input, Row, Col,Modal } from "antd";
import "./index.scss";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const Register = () => {
  const [error,setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    console.log(values);

    try {     
      const response = await api.post("user/register", values);
      const { token } = response.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      Modal.success({
        title: "Registration Successful!",
        content: (
          <div>
            <p>You have registered successfully.</p>
            <p>Click the button below to go to the login page.</p>
          </div>
        ),
        onOk: () => navigate("/login"), 
      }); 
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data 
      if (errorMessage.includes("Email already exists")) { 
        Modal.error({
            title: "Error",
            content: (
                <div>
                    <p>Email already exists.</p>
                </div>
            ),
        });
    }
  };
}
  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter your password!"));
    }
    
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNonAlphanumeric = /[^\w]/.test(value); // This checks for non-alphanumeric characters
    const isLengthValid = value.length >= 6;
  
    const errors = [];
    if (!hasUpperCase) errors.push("at least one uppercase letter ('A'-'Z')");
    if (!hasLowerCase) errors.push("at least one lowercase letter ('a'-'z')");
    if (!hasNonAlphanumeric) errors.push("at least one non-alphanumeric character");
    if (!isLengthValid) errors.push("at least 6 characters long");
  
    if (errors.length) {
      return Promise.reject(new Error("Passwords must have " + errors.join(", ") + "."));
    }
    
    return Promise.resolve();
  };
  const slideVariants = {
    initial: { x: '-100%' },
    enter: { x: 0 },
    exit: { x: '100%' },
  };
  
  return (
    <motion.div variants={slideVariants} initial="initial" animate="enter" exit="exit">

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
                  rules={[{ validator: validatePassword }]}
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
                    { required: true, message: "Please confirm your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match!'));
                      },
                    }),
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
    </motion.div>

  );
};

export default Register;
