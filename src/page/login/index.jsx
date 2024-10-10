import { Button, Form, Input } from "antd";
import "./index.scss";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    console.log(values);

    try {
      const response = await api.post("/user/login", values);
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await api.post("login/google", {
        token: credentialResponse.credential,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Google Login Failed!");
    }
  };

  return (
    <div className="login">
      <div className="background-image">
        <img src="/login.jpg" alt="Background" />
      </div>

      <div className="login__form">
        <div className="form-wrapper">
          <Form
            className="form"
            labelCol={{
              span: 24,
            }}
            onFinish={handleLogin}
          >
            <div className="form-header">WELCOME TO KOIFARMSHOP</div>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
              ]}
            >
              <Input type="text" placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>

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
                  onError={() => {
                    alert("Google Login Failed!");
                  }}
                />
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
