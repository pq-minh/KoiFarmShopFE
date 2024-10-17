import React, { useState,useEffect } from 'react';
import { Card} from 'antd';
import api from "../../../config/axios";

import { ShoppingCartOutlined, DollarOutlined , CheckOutlined} from '@ant-design/icons';
import "./index.scss"
import Item from 'antd/es/list/Item';
const { Meta } = Card;
const CardProduct = ({products}) => {
    const maxLength = 100; 
    const description = products.description || ""; 
    const [carts,setCarts] = useState([]);
    const isTruncated = description.length > maxLength;
    const temp = ["Koi","Lô cá"]
    const [formData, setFormData] = useState({
      koiId: null,
      batchKoiId: null
      });
  //goi ham get cart de biet koi nao da duoc them vao gio hang 
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
  //check koi da co trong gio hang
  const isItemInCart = (koiId) => {
    return carts.some(cartItem => cartItem.koiId === koiId);
    };
  // xu ly viec add to cart 
  const handleAddToCart = (koiId, name,batchId) => {
    console.log(formData)
      if (name.includes(temp[1])) {
          setFormData(prev => ({ ...prev, batchKoiId: batchId, koiId: null })); 
      } else if (name.includes(temp[0])) {
          setFormData(prev => ({ ...prev, koiId: koiId, batchKoiId: null })); 
          setCarts(prevCarts => [
            ...prevCarts,
            { koiId }
        ]);
      }
  };
  //goi ham post de add
  useEffect(() => {
      const fetchKoiData = async () => {
          try {
              if (formData.koiId || formData.batchKoiId) { 
                  const response = await api.post("/Carts", formData);
                  if (response.status === 200) {
                      console.log("Item added to cart successfully!");
                  }
              }
          } catch (err) {
              console.error("Error adding item to cart:", err);
          }
      };

      fetchKoiData();
  }, [formData]);
  return (
      


    <div className='card-container'>
    {
        products.map(product =>(
            
            <Card
            hoverable
            style={{ width: 240,height:440,marginRight:30,marginBottom:30, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: 'whitesmoke' }}
            cover={
                <div style={{ position: 'relative' }} className='img-content'>
                <img
                  alt="example"
                  src={product.image}
                  style={{ width: '95%'}}
                />
                <div className='detail'>
                  <p className='size'>Nguồn gốc: {product.origin}</p>
                  <p className='size'>Cân nặng: {product.weight} kg</p>
                  <p className='size'>Tuổi: {product.age} năm</p>
                  <p className='size'>Kích thước: {product.size} cm</p>
                </div>
                </div>                         
            }
             className='card'
  
          >
            <Meta title={product.name}  className='title' />
            <div className='description' style={{ height: '110px', overflow: 'hidden' }}> 
            <p style={{ margin: '10px 0' }} className='description'>
                 {isTruncated ? `${product.description.slice(0, maxLength)}...` : product.description}
             </p>
            </div>
            <h5 style={{ fontSize:"15px " }} className='price-cart-koi'><DollarOutlined style={{marginRight:5}}/> {product.price}.000 VND</h5>
            <div className='button-add'>
               <div className='icon-cn'>
               {isItemInCart(product.koiId) ? (
                <CheckOutlined className='cart-icon' />
               ) : (
                <ShoppingCartOutlined
                    key={product.koiId}
                    className='cart-icon'
                 onClick={() => handleAddToCart(product.koiId, product.name, product.batchKoiId)}
                />
                  )}  
                </div>
            </div>,    
          </Card>
          )

        )
    }
    </div>
  )
}

export default CardProduct
