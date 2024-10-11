// eslint-disable-next-line no-unused-vars
import React, { useState }from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./index.scss";
import { Button, Dropdown, Menu  , Avatar, Space, Flex} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import {
  DownOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  BellOutlined
} from "@ant-design/icons";


function Header() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        console.log(decodedToken.role);
        setRole(decodedToken.role); 
      } catch (error) {
        console.error("Failed to decode token", error);
        navigate("/"); 
      }
    } else {
      navigate("/"); // Điều hướng đến trang Home nếu không có token
    }

    setIsLoading(false); // Kết thúc trạng thái loading
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Hiển thị khi đang xác thực
  }


  const serviceMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/service/cleaning">Assigments</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/service/maintenance">Maintenance</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header">
      <div className="logo-section">
        <Link to={"/"}>
          <img
            src="https://cdn.pixabay.com/photo/2020/07/13/02/29/koi-5399206_1280.png"
            alt="Koi Fish"
            width={80}
          />
        </Link>
        <div className="fs-4 fw-bold text-primary ms-3">KoiFarmShop</div>
      </div>

      <nav>
        <ul className="menu">
          <li>
            <Link to="/" className="text-dark text-decoration-none">
              Home
            </Link>
          </li>
          {
            role == "Staff" && (
              <li>
            <Link to="/staff" className="text-dark text-decoration-none " >
              Manage User
            </Link>
          </li>
            )
          }

          <li>
          <Link to="/fish" className="text-dark text-decoration-none">
              Fish
            </Link>
          </li>
          <li>
            <Dropdown overlay={serviceMenu}>
              <a
                className="ant-dropdown-link text-dark text-decoration-none"
                onClick={(e) => e.preventDefault()}
              >
                Service <DownOutlined className="dropdown-icon" />
              </a>
            </Dropdown>
          </li>          
          <li>
            <Link to="/" className="text-dark text-decoration-none">
              Feedbacks
            </Link>
          </li>
          <li>
            <Link to="/" className="text-blue text-decoration-none">
              <ShoppingCartOutlined style={{ fontSize: "24px" }} /> Cart
            </Link>
          </li>

          <li>
            <Link to="/" className="text-blue text-decoration-none">
              <SearchOutlined style={{ fontSize: "24px" }} /> Search
            </Link>
          </li>   

          <li>
            <Link to="/" className="text-dark text-decoration-none">
            <BellOutlined style={{ fontSize: "25px"}}/>
            </Link>
          </li>       
          <li>
          {
            token == null ? (
              <Button
              type="primary"
              className="login-button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            ):( 
              <Space direction="vertical" size={16}>
          <Space wrap size={16}>
            <Avatar  size={64}  
             onClick={() => {
            navigate("/userinfor"); // Điều hướng đến trang đăng nhập
           }}
          style={{ cursor: 'pointer',display:Flex,right:-190 }} // Thêm con trỏ chuột để báo hiệu có thể nhấp
             icon={<UserOutlined />}  />
          </Space>
        </Space>
            )
          }
           
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
