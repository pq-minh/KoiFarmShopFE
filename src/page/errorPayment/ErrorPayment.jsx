import React,{useState} from 'react';
import Header from '../../component/header';
import { Button } from 'antd'; 
import './ErrorPayment.scss'; 
const ErrorPayment = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
             <Header setIsLoggedIn={setIsLoggedIn}/>
    <div className='errorpayment-page'>
     
    <div className='error-notification'>
  <h2>An error occurred during the payment process</h2>
  <p>
    We apologize, your transaction was not successful. Please check your payment details and try again.
  </p>
  <p>
    If the issue persists, please contact our customer support team.
  </p>
  <Button type='primary' onClick={handleGoHome}>
    Return to Homepage
  </Button>
</div>

    </div>
    </>
  );
};

export default ErrorPayment;
