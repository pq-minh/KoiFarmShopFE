import React from 'react';
import Header from '../../component/header';
import { Button } from 'antd'; 
import './ErrorPayment.scss'; 
const ErrorPayment = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <>
    <Header />
    <div className='errorpayment-page'>
     
      <div className='error-notification'>
        <h2>Đã xảy ra lỗi trong quá trình thanh toán</h2>
        <p>
          Xin lỗi, giao dịch của bạn không thành công. Vui lòng kiểm tra lại thông tin thanh toán và thử lại.
        </p>
        <p>
          Nếu vấn đề vẫn tiếp tục, hãy liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi.
        </p>
        <Button type='primary' onClick={handleGoHome}>
          Quay lại trang chủ
        </Button>
      </div>
    </div>
    </>
  );
};

export default ErrorPayment;
