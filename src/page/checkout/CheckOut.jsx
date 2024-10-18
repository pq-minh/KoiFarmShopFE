import React,{useEffect,useState} from 'react'
import KoiCart from '../../component/shopping-cartCP/koicart/KoiCart'
import Header from "../../component/header";
import CartInfor from '../../component/shopping-cartCP/InforCart/CartInfor';
import api from "../../config/axios";
import CheckOutInfor from '../../component/shopping-cartCP/CheckOutInfor/CheckOutCart';
const UserCart = () => 
  {
    const [carts,setCarts] = useState([])
    const [quantities, setQuantities] = useState({});

    const updateQuantity = (index, qty) => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [index]: qty,
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
    }, []);
  return (
    <div>
    <Header/>
      <div className='row'>
      <div className='col-8'>
      <KoiCart carts={carts} setCarts={setCarts} updateQuantity={updateQuantity}/>
      </div>
      <div className='col-4'>
      <CheckOutInfor/>
      </div>
      </div>
    </div>
  )
}

export default UserCart
