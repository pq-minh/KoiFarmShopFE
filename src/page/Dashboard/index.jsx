import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { EyeOutlined, HomeOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const selectedKey = '1'; // Set a default selected key
  const items = [
    {
      key: '1',
      label: <span><HomeOutlined /> Home</span>, 
    },
    {
      key: 'sub1', 
      label: <span><UserOutlined/> Koi Management</span>,
      children: [
        { key: '2', label: <Link to="/admin/viewkoi"><EyeOutlined /> View Koi</Link> }, 
        { key: '3', label: <Link to="/admin/addkoi"><PlusCircleOutlined /> Add Koi</Link> }, 
      ],
    },
  ];

  const onMenuClick = (e) => {
    console.log('Menu clicked:', e);
    // Handle menu click events here
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <div className="logo" />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          {/* Add content here */}
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
           <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Koi Management Dashboard ©2024</Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
