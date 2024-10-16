import React from 'react';
import { Card } from 'antd';
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.scss';

const { Meta } = Card;

const CardProduct = ({ products, onAddToCart }) => {
  const maxLength = 100; 

  return (
    <div className='card-container'>
      {products.map((product) => {
        const description = product.description || ""; 
        const isTruncated = description.length > maxLength;

        return (
          <Card
            key={product.koiId} // Use a unique key for each card
            hoverable
            style={{
              width: 240,
              height: 440,
              marginRight: 30,
              marginBottom: 30,
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              backgroundColor: 'whitesmoke',
            }}
            cover={
              <div style={{ position: 'relative' }} className='img-content'>
                <Link to={`/details/${product.koiId}`}>
                  <img
                    alt={product.name}
                    src={product.image}
                    style={{ width: '95%' }}
                  />
                </Link>
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
            <Meta title={product.name} className='title' />
            <div className='description' style={{ height: '100px', overflow: 'hidden' }}>
              <p style={{ margin: '10px 0' }} className='description'>
                {isTruncated ? `${description.slice(0, maxLength)}...` : description}
              </p>
            </div>
            <h5 style={{ fontSize: "14px" }} className='price-cart'>
              <DollarOutlined style={{ marginRight: 5 }} /> {product.price}.000 VND
            </h5>
            <div className='button-add' onClick={() => onAddToCart(product)}>
              <ShoppingCartOutlined key="Add Cart" className='cart-icon' />
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CardProduct;
