import React, { useEffect, useState } from 'react';
import { Card, InputNumber } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import "./index.scss";

const { Meta } = Card;

const KoiCart = ({ carts, updateQuantity,updateCarts, isCheckout }) => {
    const [quantities, setQuantities] = useState({});
    const [formDataAdd, setFormDataAdd] = useState({});
    const [formDataRemove, setFormDataRemove] = useState({});

    // Khởi tạo số lượng khi carts thay đổi
    useEffect(() => {
        const initialQuantities = {};
        carts.forEach(cart => {
            initialQuantities[cart.batchKoiId] = cart.quantity; 
        });
        setQuantities(initialQuantities);
    }, [carts]);

    // Hàm gọi API để cập nhật số lượng
    useEffect(() => {
        const fetchData = async (url, method, body) => {
            try {
                const token = sessionStorage.getItem('token')?.replaceAll('"', '');
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json-patch+json',
                    },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Response data:', data);
            } catch (err) {
                console.error('API call failed:', err);
            }
        };

        if (Object.keys(formDataAdd).length > 0) {
            fetchData('https://localhost:7228/api/carts/changequantity', 'PATCH', formDataAdd);
        }
    }, [formDataAdd]);

    // Hàm thay đổi số lượng
    const handleChangeQuantity = (batchId, value) => {
        if (value < 1) return; 
        const currentQuantity = quantities[batchId] || 0; 
        const status = value > currentQuantity ? "Add" : "Minus";

        updateQuantity(batchId, value);
        setQuantities((prev) => ({ ...prev, [batchId]: value }));

        setFormDataAdd({
            batchKoiId: batchId,
            status: status,
        });
    };

    // Hàm xóa item khỏi giỏ hàng
    const handleRemoveCart = (batchId, koiId) => {
        const formDataRemove = {
            batchKoiId: batchId || null,
            koiId: koiId || null,
        };
        setFormDataRemove(formDataRemove);
        fetchData('https://localhost:7228/api/carts/deleteitem', 'DELETE', formDataRemove);
        updateCarts(batchId, koiId);
    };

    // Hàm chung để gọi API
    const fetchData = async (url, method, body) => {
        try {
            const token = sessionStorage.getItem('token')?.replaceAll('"', '');
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json-patch+json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);
        } catch (err) {
            console.error('API call failed:', err);
        }
    };

    return (
        <div className='shopping-cart'>
            {carts.map((cart) => (
                <Card
                    key={cart.batchKoiId}
                    hoverable
                    style={{
                        width: 940,
                        height: 159,
                        borderRadius: '15px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'whitesmoke',
                        paddingRight: 260,
                        marginTop: 10
                    }}
                    className='card'
                >
                    <div className='card-content' style={{ display: 'flex', alignItems: 'center' }}>
                        <div className='img-content-shopping' style={{ marginRight: '20px' }}>
                            <img
                                alt="example"
                                src={cart.batchKoiImgUrl || cart.koiImgUrl}
                                style={{ width: '100px', height: '120px' }} 
                            />
                        </div>
                        <div className='card-title-des' style={{ marginTop: 11 }}>
                            <Meta title={cart.batchKoiName || cart.koiName} className='title' />
                            <div className='description' style={{ height: '110px', overflow: 'hidden' }}>
                                <p style={{ marginTop: 10 }} className='description-cart'>
                                    {cart.batchKoiDescription || cart.koiDescription}
                                </p>
                            </div>
                        </div>
                        <div style={{ marginRight: 30, display: "flex" }}>

                                <div className='cart-quantity'>
                                <InputNumber
                                    min={1}
                                    max={cart.koiName ? 1 : 100}
                                    defaultValue={cart.quantity}
                                    disabled={isCheckout}
                                    onChange={(value) => handleChangeQuantity(cart.batchKoiId, value)}
                                />
                            </div>
                            
                            <div className='price-cart' style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                <h5 style={{ fontSize: "13px" }}>
                                    <p style={{ display: 'flex' }}>
                                        {cart.unitPrice.toLocaleString('vi-VN') + ".000 VND"}
                                    </p>
                                </h5>
                            </div>
                            {!isCheckout && (
                            <div className='icon-remove'>
                                
                                 <button class="button-remove" onClick={() => handleRemoveCart(cart.batchKoiId, cart.koiId)}>
                             <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                            </button>
                            </div>
                        )}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default KoiCart;
