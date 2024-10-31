import React,{useEffect, useState} from 'react'
import styled from 'styled-components';
import api from "../../config/axios";
import { Modal } from 'antd';
import { Flex, Spin } from 'antd';

import { redirect } from 'react-router-dom';
const ForgotPassword = () => {
    const [errors,setErrorMessage] = useState(null);
    const [email,setEmail] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    //
    const handleForgotPassword = async (event) => {
        event.preventDefault();
        setSuccessMessage(null);
        setErrorMessage(null);
        setLoading(true);
      try { 
        const response = await api.post("user/resetpassword", { email });
        if ( response.status === 200 ) {
            Modal.success({
                content: "If your email exists, please check your inbox for the password reset link.",
            });
        } else {
            Modal.error({
                content: "An error occurred. Please try again.",
            });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    //
  return (
    <StyledWrapper>
    <div className="form-container">
      <div className="logo-container">
        Forgot Password
      </div>
      <form className="form" onSubmit={handleForgotPassword}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button className="form-submit-btn" type="submit" disabled={loading}>
                        {loading ? <Spin size="small" /> : "Send Email"}
                    </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <p className="signup-link">
        Don't have an account?
        <a href="/register" className="signup-link link"> Sign up now</a>
      </p>
    </div>
  </StyledWrapper>
  )
}
const StyledWrapper = styled.div`
  .form-container {
    width: 460px;
    background-color: #fff;
    padding: 39px 24px;
    font-size: 14px;
    font-family: inherit;
    color: #212121;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
  }

  .form-container button:active {
    scale: 0.95;
  }

  .form-container .logo-container {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
  }

  .form-container .form {
    display: flex;
    flex-direction: column;
  }

  .form-container .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .form-container .form-group label {
    display: block;
    margin-bottom: 5px;
  }

  .form-container .form-group input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 6px;
    font-family: inherit;
    border: 1px solid #ccc;
  }

  .form-container .form-group input::placeholder {
    opacity: 0.5;
  }

  .form-container .form-group input:focus {
    outline: none;
    border-color: #1778f2;
  }

  .form-container .form-submit-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: inherit;
    color: #fff;
    background-color: #212121;
    border: none;
    width: 100%;
    padding: 12px 16px;
    font-size: inherit;
    gap: 8px;
    margin: 12px 0;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
  }

  .form-container .form-submit-btn:hover {
    background-color: #313131;
  }

  .form-container .link {
    color: #1778f2;
    text-decoration: none;
  }

  .form-container .signup-link {
    align-self: center;
    font-weight: 500;
  }

  .form-container .signup-link .link {
    font-weight: 400;
  }

  .form-container .link:hover {
    text-decoration: underline;
  }`;

export default ForgotPassword
