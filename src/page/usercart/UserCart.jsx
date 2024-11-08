import React,{useEffect,useState} from 'react'
import KoiCart from '../../component/shopping-cartCP/koicart/KoiCart'
import Header from "../../component/header";
import CartInfor from '../../component/shopping-cartCP/InforCart/CartInfor';
import api from "../../config/axios";
import { Pagination,Breadcrumb } from 'antd';
import { HomeOutlined} from '@ant-design/icons';
import { motion } from 'framer-motion';

import CheckOutInfor from '../../component/shopping-cartCP/CheckOutInfor/CheckOutCart';

const UserCart = () => 
  {
    const [carts,setCarts] = useState([])
    const [quantities, setQuantities] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const updateQuantity = (batchKoiId, newQuantity) => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [batchKoiId]: newQuantity,
      }));
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
    }, [quantities]);
    //hàm để render lại carts 
    const handleUpdateCarts =(batchId,koiId) =>{
      setCarts(prevCarts => 
        prevCarts.filter(cart => !(cart.batchKoiId === batchId && cart.koiId === koiId))
    );
    }
    // breadcumItems setup
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
    ];
    //
    const tableVariants = {
      hidden: { opacity: 0, y: 20 },  
      visible: { opacity: 1, y: 0 }    
    };

    
  return (
    <div>
    <Header setIsLoggedIn={setIsLoggedIn}/>
    <Breadcrumb style={{ backgroundColor: '#fff', display: 'flex', position: 'relative' }} items={breadcrumbItems} />
      <div className='row'>
      <motion.div
      initial="hidden"
      animate="visible"
      variants={tableVariants}
      transition={{ duration: 0.5 }}  
    >
      <div className='col-8'>
      <KoiCart carts={carts} setCarts={setCarts} updateQuantity={updateQuantity} updateCarts={handleUpdateCarts} isCheckout={false}/>
      <Pagination defaultCurrent={1} total={50} style={{marginLeft:280,marginTop:25}}/>;
      </div>
      </motion.div>  
     
      <div className='col-4'>
          <CartInfor carts={carts} quantities={quantities} />  
      </div>
      </div>
    </div>
  )
}

export default UserCart
