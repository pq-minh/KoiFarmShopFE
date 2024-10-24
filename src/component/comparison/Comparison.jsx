import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import "./index.scss";
import { Button, Flex } from 'antd';

const Comparison = ({ visible, onClose,productone,producttwo ,setProductOne, setProductTwo }) => {
    if (!visible) return null;

    const handleRemoveProductOne = () => {
        setProductOne(null); // Xóa sản phẩm 1
    }

    const handleRemoveProductTwo = () => {
        setProductTwo(null); // Xóa sản phẩm 2
    }


    return (
            <div className="comparison-modal">
                <CloseOutlined className="close-icon" onClick={onClose} />
                <div className='row product-box'>
                {productone ? (
                    <div className='col product-1'>
                        <img className='product-img1' src={productone.image} alt='Tên sản phẩm 1' />
                        <h3 className='product-name'>{productone.name}</h3>
                        <p className='size'>{productone.size + "cm"}</p>
                        <p className='weight'>{productone.weight + "kg"}</p>
                        <p className='product-price'>{productone.price}.000 VND</p>
                        <Button type='primary' onClick={handleRemoveProductOne} >Remove</Button>
                    </div>
                ) : (
                    <div className='col product-1'>
                        <p>Sản phẩm 1 đã được xóa</p>
                    </div>
                )}

                {producttwo ? (
                    <div className='col product-2'>
                        <img className='product-img2' src={producttwo.image} alt='Tên sản phẩm 2' />
                        <h3 className='product-name'>{producttwo.name}</h3>
                        <p className='size'>{producttwo.size + "cm"}</p>
                        <p className='weight'>{producttwo.weight + "kg"}</p>
                        <p className='product-price'>{producttwo.price}.000 VND</p>
                        <Button type='primary' onClick={handleRemoveProductTwo} >Remove</Button>
                    </div>
                ) : (
                    <div className='col product-2'>
                        <p>Sản phẩm 2 đã được xóa</p>
                    </div>
                )}
                </div>
            </div>
    );
};

export default Comparison;
