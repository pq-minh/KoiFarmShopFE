import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import "./index.scss";
import { Button } from 'antd';

const Comparison = ({ visible, onClose, productone, producttwo, setProductOne, setProductTwo }) => {
    if (!visible) return null;

    const handleRemoveProductOne = () => {
        setProductOne(null); 
    };

    const handleRemoveProductTwo = () => {
        setProductTwo(null); 
    };

    return (
        <div className="comparison-modal">
            <CloseOutlined className="close-icon" onClick={onClose} />
            <div className='row product-box'>
                {!productone && !producttwo ? (
                    <div>
                        <p>No products available</p>
                    </div>
                ) : (
                    <>
                        {productone ? (
                            <div className='col product-1'>
                                <img className='product-img1' src={productone.image || null} alt='Product 1' />
                                <h3 className='product-name'>{productone.name || "Product 1"}</h3>
                                <p className='size'>{(productone.size || 0) + " cm"}</p>
                                <p className='weight'>{(productone.weight || 0) + " kg"}</p>
                                <p className='product-price'>{(productone.price || 0) + ".000 VND"}</p>
                                <Button type='dashed' onClick={handleRemoveProductOne}>Remove</Button>
                            </div>
                        ) : (
                            <div className='col product-1'>
                                <p>Product 1 has been deleted</p>
                            </div>
                        )}
                        <hr />
                        {producttwo ? (
                            <div className='col product-2'>
                                <img className='product-img2' src={producttwo.image || null} alt='Product 2' />
                                <h3 className='product-name'>{producttwo.name || "Product 2"}</h3>
                                <p className='size'>{(producttwo.size || 0) + " cm"}</p>
                                <p className='weight'>{(producttwo.weight || 0) + " kg"}</p>
                                <p className='product-price'>{(producttwo.price || 0) + ".000 VND"}</p>
                                <Button type='dashed' onClick={handleRemoveProductTwo}>Remove</Button>
                            </div>
                        ) : (
                            <div className='col product-2'>
                                <p>Product 2 has been deleted</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Comparison;
