// eslint-disable-next-line no-unused-vars
import React from "react";
import "./index.scss";
import { Button, Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  DownOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  BellOutlined
} from "@ant-design/icons";

function Header() {
  const navigate = useNavigate();
 
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
        <Link to="/service/cleaning">Commission</Link>
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
            <Button
              type="primary"
              className="login-button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
