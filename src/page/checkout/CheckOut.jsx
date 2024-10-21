import React,{useEffect,useState} from 'react'
import KoiCart from '../../component/shopping-cartCP/koicart/KoiCart'
import Header from "../../component/header";
import api from "../../config/axios";
import CheckOutInfor from '../../component/shopping-cartCP/CheckOutInfor/CheckOutCart';
import { Breadcrumb } from 'antd';
import { HomeOutlined} from '@ant-design/icons';
const UserCart = () => 
  {
    const [carts,setCarts] = useState([])
    useEffect(() => {
      const fetchKoiData = async () => {
        try {
          const response = await api.get("carts");
          if (response.status === 200) {
            setCarts(response.data);
          }
        } catch (err) {
          console.log(err);
        }
      };   
      fetchKoiData();
    }, []);
    //breadcrumb setup
    const breadcrumbItems = [
      {
        href: '/',
        title: <HomeOutlined />,
      },
      {
        href: '/shop',
        title: 'Products',
      },
      {
        href: '/cart',
        title: 'Shopping Carts',
      },
      {
        href: '/checkout',
        title: 'Checkout',
      },
    ];

  return (
    <div>
    <Header/>
    <Breadcrumb style={{ backgroundColor: '#fff', display: 'flex', position: 'relative' }} items={breadcrumbItems} />

      <div className='row'>
      <div className='col-8'>
      <KoiCart carts={carts} setCarts={setCarts} isCheckout={true}/>
      </div>
      <div className='col-4'>
      <CheckOutInfor carts={carts}/>
      </div>
      </div>
    </div>
  )
}

export default UserCart
