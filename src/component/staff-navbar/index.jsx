import React, { useState } from 'react';
import "./index.scss";
import { Layout, Button, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Logo from '../logo/logo';
import MenuList from '../menuliststaff/menulist';
import Toggle from '../toggle-theme/toggle';
const { Header, Sider } = Layout;

function StaffAction() {
    const [darkTheme, setDarkTheme] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    
    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Sider theme={darkTheme ? 'dark' : 'light'} className="sidebar" collapsed={collapsed} collapsible trigger={null}>         
                <Logo />
                <MenuList darkTheme={darkTheme} />
                <Toggle darkTheme={darkTheme} toggleTheme={toggleTheme} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button 
                        className="navbar-toggler" 
                        onClick={() => setCollapsed(!collapsed)} 
                        type="text" 
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
                    />
                </Header>
            </Layout>
        </Layout>
    );
}

export default StaffAction;
