import React from 'react'
import Header from "../../component/header";
import "./index.scss";
import { Button, Divider, Flex, Radio } from 'antd';
import { DownloadOutlined,ShoppingCartOutlined } from '@ant-design/icons';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import { Breadcrumb } from 'antd';

const Details = () => {
  return (
    <div >
           <Header setIsLoggedIn={setIsLoggedIn}/>

        <Breadcrumb style={{marginLeft:30,marginTop:30}}
    items={[
      {
        href: '',
        title: <HomeOutlined />,
      },
      {
        href: '',
        title: (
          <>
            <UserOutlined />
            <span>Application List</span>
          </>
        ),
      },
      {
        title: 'Application',
      },
    ]}
  />
        <div className='row'>
        
            <div className='col-5 img-box'>
                
                <img src='https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g'></img>
               
            </div>
            <div className='col-5 details-box'>
                 <h3>Koi Kohaku 3</h3>
                  <div className='description-box'>
                  Tancho kohaku 84 cm 4 tuổi có nguồn gốc từ Dainichi  
                  có hình thể đẹp mắt, dù mới 4 tuổi nhưng kích thước 
                  đã lên đến 84cm. Hoa văn đẹp, màu sắc rõ nét, 
                  hình thể đẹp, khỏe mạnh, vạm vỡ, body rắn chắc.
                  </div>      
                  <hr/>
                  <div className='yob '>
                    Nam sinh: 2019
                  </div>
                  <hr/>
                  <div className='size '>
                    Kich thuoc: 19 cm 
                  </div>
                  <hr/>
                  <div  className='weight '>
                    Can nang: 8.5 kg
                  </div>
                  <hr/>
                  <div className='sex '>
                    Gioi tinh: koi cai
                  </div>
                  <hr/>
                  <div className='personality'>
                    Tinh cach: Hien hoa
                  </div>
                  <hr/>
                  <div className='origin'>
                    Nguon goc: Koi daichi
                  </div>
                  <div className='price' style={{marginTop:20}}>
                    <h4>
                        Gia uu dai: 300.000d
                    </h4>
                  </div>
                <div className='action-box'>
                <Button type="primary" style={{width:500,height:50, marginTop:20}}>
                    Buy <now></now>
                </Button>
                <ShoppingCartOutlined style={{
                   width:75,height:50,justifyContent:'center',display:Flex
                    }} className='icon-cart'/>
                </div>
            </div>
            <div className='col-2 infor-box'>
                 <div className='infor-contact'>
                    Thong tin lien lac
                 </div>   
                 <div className='addresss'>
                    
                 </div>
            </div>
        </div>    
    </div>
  )
}

export default Details
