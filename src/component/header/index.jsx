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

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={() => {
          navigate("/userinfor");
        }}>
          Profile Setting
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            Order History
        </a>
      ),
    },
    {
      key: '3', 
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={() => {
          navigate("/assigment-history");
        }} >
          Assigments History
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Log out
        </a>
      ),
    },
  ];
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
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

 
  const FishOption = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/fish/single">Single</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/fish/batch">Batch</Link>
      </Menu.Item>
    </Menu>
  );

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
          <Link to="/shop" className="text-dark text-decoration-none">
              Koi Shop
            </Link>
            <Dropdown overlay={FishOption}>
              <a
                className="ant-dropdown-link text-dark text-decoration-none"
                onClick={(e) => e.preventDefault()}
              >
                Fish <DownOutlined className="dropdown-icon" />
              </a>
            </Dropdown>
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
            <Link to="/details" className="text-dark text-decoration-none">
              Feedbacks
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-blue text-decoration-none">
              <ShoppingCartOutlined style={{ fontSize: "24px" }} /> Cart
            </Link>
          </li>
          <li>
            <Link to="/allproduct" className="text-blue text-decoration-none">
              <SearchOutlined style={{ fontSize: "24px" }} /> Search
            </Link>
          </li>
          <li>
            <Link to="/" className="text-dark text-decoration-none">
              <BellOutlined style={{ fontSize: "25px" }} />
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
              <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
      >
      <a className="avatar">
         <Avatar size={50} icon={<UserOutlined />} />  
         </a>
      </Dropdown>
            )
          }
           
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
