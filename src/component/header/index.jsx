// eslint-disable-next-line no-unused-vars
import React, { useState }from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./index.scss";
import { Button, Dropdown, Menu  , Avatar, Space, Flex,Modal} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import {
  DownOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  BellOutlined,
} from "@ant-design/icons";
const Header = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
//hanldle logout
const handleLogout = (e) => {
  e.preventDefault();
  Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      onOk: () => {
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("token");
          setIsLoggedIn(false); 
          navigate("/login");
      },
  });
};

  const items = [
    { key: "1", label: <Link to="/userinfor">Profile Setting</Link> },
    { key: "2", label: <Link to="/orderhistory">Order History</Link> },
    { key: "3", label: <Link to="/assigment-history">Assignments History</Link> },
    {
      key: "4",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            navigate("/requestcare");
          }}
        >
          Request Care
        </a>
      ),
    },
    { key: "5", label: <Link to="/" onClick={handleLogout}>Log Out</Link> },
];

useEffect(() => {
  const storedToken = sessionStorage.getItem("token");
  setToken(storedToken);

  if (storedToken) {
      try {
          const decodedToken = jwtDecode(storedToken);
          setRole(decodedToken.role);
          setIsLoggedIn(true);
          if (decodedToken.role === "Admin") {
            navigate("/admin");
          }
      } catch (error) {
          console.error("Failed to decode token", error);
          navigate("/");
      }
  }
  setIsLoading(false);
}, [navigate, setIsLoggedIn]);

if (isLoading) {
  return <div>Loading...</div>; 
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
  //modal 
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
          {role == "Staff" && (
            <li>
              <Link to="/staff" className="text-dark text-decoration-none ">
                Manage User
              </Link>
            </li>
          )}
          <li>
            <Link to="/shop" className="text-dark text-decoration-none">
              Koi Shop
            </Link>
          </li>
          <li>
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
            <Link to="/feedback" className="text-dark text-decoration-none">
              Feedbacks
            </Link>
          </li>
          <li>
          {token === null ?(
            <>
          <Link to="#" onClick={showModal} className="text-blue text-decoration-none">
            <ShoppingCartOutlined style={{ fontSize: "24px" }} /> Cart
          </Link>
          <Modal title="Login" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Vui lòng đăng nhập để có thể truy cập.</p>
          </Modal>
        </>
          ):( <Link to="/cart" className="text-blue text-decoration-none">
              <ShoppingCartOutlined style={{ fontSize: "24px" }} /> Cart
            </Link>
            ) }
           
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
            {token == null ? (
              <Button
                type="primary"
                className="login-button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            ) : (
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
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
