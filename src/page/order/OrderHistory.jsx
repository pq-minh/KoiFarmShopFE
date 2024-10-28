import React,{useState} from 'react'
import Header from '../../component/header'
import Order from '../../component/order-component/Order'
const OrderHistory = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
       <Header setIsLoggedIn={setIsLoggedIn}/>

    <div className='order-page'>
      
      <Order/>
    </div>
    </>
  )
}

export default OrderHistory
