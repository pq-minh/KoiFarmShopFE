import React, { useEffect, useState } from 'react';
import api from '../../../config/axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutComplete = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem('carts'));
        if (!orderData) {
            console.error('Order data is not available in localStorage.');
            navigate('/'); // Redirect if orderData is not available
            return;
        }

        const params = new URLSearchParams(location.search);
        const amount = params.get('vnp_Amount');
        const bankCode = params.get('vnp_BankCode');
        const bankTranNo = params.get('vnp_BankTranNo');
        const cardType = params.get('vnp_CardType');
        const orderInfo = params.get('vnp_OrderInfo');
        const payDate = params.get('vnp_PayDate');
        const responseCode = params.get('vnp_ResponseCode');
        const tmnCode = params.get('vnp_TmnCode');
        const transactionNo = params.get('vnp_TransactionNo');
        const transactionStatus = params.get('vnp_TransactionStatus');
        const txnRef = params.get('vnp_TxnRef');
        const secureHash = params.get('vnp_SecureHash');

        const payload = {
            carts: orderData.carts,
            method: orderData.method,
            discountId: orderData.discountId || 0,
            phoneNumber: orderData.phoneNumber || null,
            address: orderData.address,
            request: {
                amount,
                bankCode,
                bankTranNo,
                cardType,
                orderInfo,
                payDate,
                vnPayResponseCode: responseCode,
                tmnCode,
                transactionNo,
                transactionStatus,
                txnRef,
                secureHash,
            },
        };
        console.log('Payload:', payload);

        const sendDataToBackend = async () => {
            setLoading(true);
            try {
                const response = await api.post('https://localhost:7228/api/orders', payload);
                if (response.status === 204) {
                    localStorage.removeItem('carts');
                    navigate('/'); 
                } else {
                    setError('Failed to process your order. Please try again.');
                }
            } catch (error) {
                console.error('Error sending data to backend:', error);
                setError('An error occurred while processing your order. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        sendDataToBackend();
    }, [location.search, navigate]);

    return (
        <div className='checkoutcomplete-cp'>
            {loading && <p>Processing your order...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default CheckoutComplete;
