import React,{useState} from 'react';
import Header from '../../component/header';
import { Button } from 'antd';
import './CompletePayment.scss'; 

const CompletePayment = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
     <Header setIsLoggedIn={setIsLoggedIn}/>
    <div className='complete-payment-page'>
      
    <div className='payment-notification'>
  <h2>Transaction Successful!</h2>
  <p>Thank you for shopping with us.</p>
  <p>Your order information has been recorded.</p>
  <p>
    If you have any questions, please contact our customer support team.
  </p>
  <Button type='primary' onClick={handleGoHome}>
    Return to Homepage
  </Button>
</div>

    </div>
    </>
  );
};

export default CompletePayment;
