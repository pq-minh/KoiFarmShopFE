import React,{useState} from 'react'
import { Button } from 'antd';
import ForgotPassword from '../../component/forgot-password/ForgotPassword'
import Header from "../../component/header";
import "./index.scss"
const ForgotPasswordPage = () => {
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    
    <div className='forgot-password-page'>
        <ForgotPassword/>
    </div>
  )
}

export default ForgotPasswordPage
