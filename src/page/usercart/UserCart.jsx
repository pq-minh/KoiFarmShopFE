import React,{useEffect,useState} from 'react'
import KoiCart from '../../component/shopping-cartCP/koicart/KoiCart'
import Header from "../../component/header";
import CartInfor from '../../component/shopping-cartCP/InforCart/CartInfor';
import api from "../../config/axios";
const UserCart = () => 
  {
    const [carts,setCarts] = useState([])
    useEffect(() => {
      const fetchKoiData = async () => {
        try {
          const response = await api.get("Carts");
          if (response.status === 200) {
            setCarts(response.data);
          }
        } catch (err) {
          console.log(err);
        }
      };   
      fetchKoiData();
    }, []);
  return (
    <div>
    <Header/>
      <div className='row'>
      <div className='col-8'>
      <KoiCart carts={carts}/>
      </div>
      <div className='col-4'>
        <CartInfor carts={carts}/>
      </div>
      </div>
    </div>
  )
}

export default UserCart
