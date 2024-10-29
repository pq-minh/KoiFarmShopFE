import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import "./index.scss";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from 'framer-motion';

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Load Google API
  useEffect(() => {
    const loadGapi = () => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.async = true;
      script.onload = () => {
        window.gapi.load("client:auth2", initClient);
      };
      document.body.appendChild(script);
    };

    loadGapi();
  }, []);

  const initClient = () => {
    window.gapi.client.init({
      clientId: "58740703879-3s8ddc1rno4kavb9neslns90iphlps9g.apps.googleusercontent.com",
      scope: "profile email",
    });
  };

  const handleLogin = async (values) => {
    try {
      const response = await api.post("user/login", values);
      const { token } = response.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await fetch("https://localhost:7228/api/google/external-login-callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed!");
      }
      const data = await response.json();
      console.log(data); 
      sessionStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  
  


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

    <div className="login">
      <div className="background-image">
        <img src="/login.jpg" alt="Background" />
      </div>

      <div className="login__form">
        <div className="form-wrapper">
          <Form
            className="form"
            labelCol={{ span: 24 }}
            onFinish={handleLogin}
          >
            <div className="form-header">WELCOME TO KOIFARMSHOP</div>

            <Form.Item
              label="Email"
              name="Email"
              rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <p className="forgot-pass" style={{marginLeft:180,fontSize:13}}><a href="/forgot-password">Forgot password?</a></p>

            {error && <p style={{ color: "red" }}>Invalid Username or Password</p>}

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
              
            </Form.Item>

            <div className="form-divider">
              <div className="divider"></div>
              <span>OR</span>
              <div className="divider"></div>
            </div>

            <Form.Item>
              <div className="register-prompt">
                <span>Don&apos;t have an account?</span>
                <a href="/register">Register</a>
              </div>
            </Form.Item>

            <Form.Item>
              <div className="custom-google-btn">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={() => alert("Google Login Failed!")}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
    </motion.div>

  );
};

export default Login;
