import React, { useState } from 'react';
import { Layout, Menu, Button, Modal } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { EyeOutlined, HomeOutlined, PlusCircleOutlined, UserOutlined, FileTextOutlined, PieChartOutlined, BarChartOutlined, ReloadOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      onOk: () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        navigate("/login");
      },
    });
  };

  const items = [
    {
      key: '1',
      label: <Link to="/admin"><HomeOutlined /> Home</Link>, 
    },
    {
      key: 'sub1', 
      label: <span><UserOutlined/> Koi Management</span>,
      children: [
        { key: '2', label: <Link to="/admin/viewkoi"><EyeOutlined /> View Koi</Link> }, 
        { key: '3', label: <Link to="/admin/addkoi"><PlusCircleOutlined /> Add Koi</Link> }, 
      ],
    },
    {
      key: 'sub2',
      label: <span><UserOutlined/> BatchKoi Management</span>,
      children :[
        { key: '4',label: <Link to="/admin/batchkoi"><EyeOutlined /> View BatchKoi</Link> },
        { key: '5' ,label: <Link to="/admin/addbatchkoi"><PlusCircleOutlined/> Add BatchKoi</Link> },
      ]
    },
    {
      key: 'sub3',
      label: <span><FileTextOutlined /> Report</span>, 
      children :[
        { key: '6', label: <Link to="/admin/report"><PieChartOutlined />Order Chart</Link>},
        { key: '7', label: <Link to="/admin/revenue"><BarChartOutlined />Revenue Chart</Link>},
      ]
    },
    {
      key: '8',
      label: <Link to="/admin/updaterole"><ReloadOutlined /> Update UserRole</Link>, 
    },
  ];

  const onMenuClick = (e) => {
    console.log('Menu clicked:', e);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            onClick={onMenuClick}
          />
          <div style={{ textAlign: 'center', marginTop: 'auto', padding: '16px' }}>
            <Button type="primary" danger onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <div className="logo" />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Koi Management Dashboard ©2024</Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
