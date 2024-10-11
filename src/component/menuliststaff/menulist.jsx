import React from 'react'
import { Menu } from 'antd'
import { HomeOutlined,AppstoreOutlined,BarsOutlined, AreaChartOutlined,ProfileOutlined } from '@ant-design/icons'
const MenuList = ({darkTheme}) => {
  return (
    <div>
            <Menu theme={ darkTheme ? 'dark' : 'light'} defaultSelectedKeys={['Home']} mode='inline' className='menu-bar'>
                <Menu.Item key="Home" icon={<HomeOutlined />}>
                    Home
                </Menu.Item>
                <Menu.Item key="Profile" icon={<ProfileOutlined />}>
                    Profile
                </Menu.Item>
                <Menu.SubMenu key="manage" icon={<BarsOutlined />} title="Manage">
                    <Menu.Item key="assigment" >
                        Manage Assigment
                    </Menu.Item>
                    <Menu.Item key="discount" >
                        Manage Discount
                    </Menu.Item>
                    <Menu.Item key="user" >
                        Manage User
                    </Menu.Item>
                    <Menu.Item key="review" >
                        Manage Review
                    </Menu.Item>                   
                </Menu.SubMenu>
                <Menu.Item key="Dasboard" icon={<AreaChartOutlined />}>
                    Dasboard
                </Menu.Item>
            </Menu>
    </div>
  )
}

export default MenuList