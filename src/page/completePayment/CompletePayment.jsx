import React from 'react';
import Header from '../../component/header';
import { Button } from 'antd';
import './CompletePayment.scss'; 

const CompletePayment = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <>
    <Header />
    <div className='complete-payment-page'>
      
      <div className='payment-notification'>
        <h2>Giao dịch thành công!</h2>
        <p>Cảm ơn bạn đã mua sắm với chúng tôi.</p>
        <p>Thông tin đơn hàng của bạn đã được ghi nhận.</p>
        <p>
           Nếu có thắc mắc, vui lòng liên hệ với bộ phận hỗ trợ khách hàng.
        </p>
        <Button type='primary' onClick={handleGoHome}>
          Quay lại trang chủ
        </Button>
      </div>
    </div>
    </>
  );
};

export default CompletePayment;
