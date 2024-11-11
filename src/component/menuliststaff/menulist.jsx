import React, { useState } from 'react';
import { Menu } from 'antd'
import { HomeOutlined,AppstoreOutlined,BarsOutlined, AreaChartOutlined,ProfileOutlined } from '@ant-design/icons'
const MenuList = ({darkTheme, onMenuClick}) => {

    return (
    <div>
            <Menu theme={ darkTheme ? 'dark' : 'light'} defaultSelectedKeys={['assigment']} mode='inline' className='menu-bar' 
                onClick={(e) => onMenuClick(e.key)}
            >
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
                    <Menu.Item key="request-care" >
                        Manage RequestCare
                    </Menu.Item>        
                    <Menu.Item key="order-detail" >
                        Manage OrderDetail
                    </Menu.Item>  
                    <Menu.Item key="feedbacks" >
                        Manage FeedBacks
                    </Menu.Item>  
                    <Menu.Item key="payment" >
                        Manage Payments
                    </Menu.Item>            
                </Menu.SubMenu>
           
            </Menu>
    </div>
  )
}

export default MenuList