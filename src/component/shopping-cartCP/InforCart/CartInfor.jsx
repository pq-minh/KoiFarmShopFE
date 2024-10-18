import React from 'react'
import "./index.scss"
import { Button, Flex } from 'antd';
import { Link, useNavigate } from "react-router-dom";

const CartInfor = ({carts,setIsChecked}) => {
    const navigate = useNavigate();
    const handleCheckOut = () => {
        setIsChecked(true);
      };

    console.log(carts)

    const totalAmount = carts.reduce((sum, cart) => sum + cart.totalPrice, 0);
    return (
    <div className='Infor-box'>
            <div className='title'><h4>Infor Carts</h4></div>
            <div className='infor'>
                    <li className='cp'>Name product</li>
                    <li className='cp'>Quantity</li>
                    <li className='cp'>Total price</li>
            </div>
            <div className='infor-cart'>    
            {carts.map((cart, index) => (
                <li key={index} className='infor-rp'>
                    <span className='cp'>
                        {cart.koiName == null ? cart.batchKoiName : cart.koiName}
                    </span>
                    <span className='cp'>
                        {cart.quantity}
                    </span>
                    <span className='cp'>
                    {(cart.totalPrice || 0).toLocaleString('vi-VN') + ".000VND"} 
                    </span>
                </li>
                )
            )
            }
            <div className='total-cp'>
            <span className='total'>
                <h5>Total Amount</h5>
                <p>{0 || totalAmount.toLocaleString('vi-VN') + ".000VND"}</p>
            </span>
            </div>
            </div>
            <div>
           <Button type="primary" block style={{marginTop:15}} onClick={handleCheckOut}>
                Check out
            </Button>
           </div>
    </div>
    
  )
}

export default CartInfor
