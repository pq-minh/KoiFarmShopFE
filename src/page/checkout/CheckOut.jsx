import React,{useEffect,useState} from 'react'
import KoiCart from '../../component/shopping-cartCP/koicart/KoiCart'
import Header from "../../component/header";
import api from "../../config/axios";
import CheckOutInfor from '../../component/shopping-cartCP/CheckOutInfor/CheckOutCart';
import { Breadcrumb } from 'antd';
import { HomeOutlined} from '@ant-design/icons';
import CheckoutComplete from '../../component/shopping-cartCP/CheckoutComplete/CheckoutComplete';
const UserCart = () => 
  {
    const [carts,setCarts] = useState([])
    const [orderData, setOrderData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //
    const handleSetOrderData = (data) => {
      setOrderData(data); 
      console.log("Order Data Set:", data); 
    };
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
             <Header setIsLoggedIn={setIsLoggedIn}/>

    <Breadcrumb style={{ backgroundColor: '#fff', display: 'flex', position: 'relative' }} items={breadcrumbItems} />

      <div className='row'>
      <div className='col-8'>
      <KoiCart carts={carts} setCarts={setCarts} isCheckout={true}/>
      </div>
      <div className='col-4'>
      <CheckOutInfor carts={carts} setOrderData={handleSetOrderData}/>
      </div>
      </div>
    </div>
  )
}

export default UserCart
