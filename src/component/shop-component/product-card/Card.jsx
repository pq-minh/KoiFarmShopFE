import React from 'react';
import { Card} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import "./index.scss"
const { Meta } = Card;
const CardProduct = ({products}) => {
    const maxLength = 100; 
    const description = products.description || ""; 
    const isTruncated = description.length > maxLength;
  return (
    <div className='card-container'>
    {
        products.map(product =>(
            
            <Card
            hoverable
            style={{ width: 240,height:558,marginBottom:30, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: '#C7E2FA' }}
            cover={
                <div style={{ position: 'relative' }} className='img-content'>
                <img
                  alt="example"
                  src={product.image}
                  style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', width: '100%' }}
                />
                <div className='detail'>
                  <p className='size'>Nguồn gốc: Koi Nhật</p>
                  <p className='size'>Cân nặng: {product.weight} kg</p>
                  <p className='size'>Tuổi: {product.age} năm</p>
                  <p className='size'>Kích thước: {product.size} cm</p>
                </div>
                </div>                         
            }
            
            actions={[
                <div className='button-add'>
                <ShoppingCartOutlined key="Add Cart" className='cart-icon'/>
                <p className='text-cart'>Add to cart</p>
                </div>,
                
            ]}   
          >
            <Meta title={product.name}  className='title' />
            <div className='description' style={{ height: '100px', overflow: 'hidden' }}> 
            <p style={{ margin: '10px 0' }} className='description'>
                 {isTruncated ? `${product.description.slice(0, maxLength)}...` : product.description}
             </p>
            </div>
            <h5 style={{ color: '#ff4d4f', fontSize:"18px " }} className='price'>Giá bán:{product.price}.000 VND</h5>
          </Card>
          )

        )
    }
    </div>
  )
}

export default CardProduct
