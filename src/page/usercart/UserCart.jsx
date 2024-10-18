import React,{useEffect,useState} from 'react'
import KoiCart from '../../component/shopping-cartCP/koicart/KoiCart'
import Header from "../../component/header";
import CartInfor from '../../component/shopping-cartCP/InforCart/CartInfor';
import api from "../../config/axios";
import { Pagination,Breadcrumb,Flex } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import CheckOutInfor from '../../component/shopping-cartCP/CheckOutInfor/CheckOutCart';

const UserCart = () => 
  {
    const [carts,setCarts] = useState([])
    const [quantities, setQuantities] = useState({});
    const [checked,setChecked] = useState(false);

    const updateQuantity = (index, qty) => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [index]: qty,
      }));
    };

    const handleSetIsChecked = (value) => {
      console.log(checked);
      setChecked(value);
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

    // 
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
    if (checked) {
      breadcrumbItems.push({
        title: 'Checkout', 
      });
    }
  return (
    <div>
    <Header/>
    <Breadcrumb style={{ backgroundColor: '#fff', display: 'flex', position: 'relative' }} items={breadcrumbItems} />
    
      <div className='row'>
      <div className='col-8'>
      <KoiCart carts={carts} setCarts={setCarts} updateQuantity={updateQuantity}/>
      <Pagination defaultCurrent={1} total={50} style={{marginLeft:280,marginTop:25}}/>;
      </div>
      <div className='col-4'>
      {
        checked == false ?(
          <CartInfor carts={carts} quantities={quantities} setIsChecked={handleSetIsChecked}/>
        ) : (
          <CheckOutInfor carts={carts}/>
        )
      }     
      </div>
      </div>
    </div>
  )
}

export default UserCart
