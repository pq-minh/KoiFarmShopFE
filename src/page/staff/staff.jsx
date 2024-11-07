import Header from "../../component/header";
import StaffAction from "../../component/staff-navbar";
import React, { useState } from 'react';
import KoiAssigment from '../../component/staff-action/koi-assigment/KoiAssigment';
import Discount from "../../component/staff-action/discount/Discount";
import './index.scss';
import { motion } from 'framer-motion';
import UserPoint from "../../component/staff-action/user/UserPoint";
import OrderManagement from "../../component/staff-action/order-detail/OrderDetail";
import FeedbackManagement from "../../component/staff-action/feedbacks/Feedbacks";
import RequestCare from "../../component/staff-action/request-care/RequestCare";
import PaymentManagement from "../../component/staff-action/payments/Payment";
const StaffPage = () => {
  const [selectedKey, setSelectedKey] = useState('assigment');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenuClick = (key) => {
    setSelectedKey(key); 
    console.log('Selected key:', key); 
};
const tableVariants = {
  hidden: { opacity: 0, y: 20 },  
  visible: { opacity: 1, y: 0 }    
};
const sideBar = {
  hidden: { opacity: 0, x: -20 },  
  visible: { opacity: 1, y: 0 }    
};

  return (
    <div>
         <Header setIsLoggedIn={setIsLoggedIn}/>
      <div className="row content">
      <div className="col-2">
      <motion.div
      initial="hidden"
      animate="visible"
      variants={sideBar}
      transition={{ duration: 0.5 }}  // Thời gian hiệu ứng
      >
      <StaffAction  onMenuClick={handleMenuClick}/>
      </motion.div>s
      </div>
      <div className="col-10">
      <motion.div
      initial="hidden"
      animate="visible"
      variants={tableVariants}
      transition={{ duration: 0.5 }}  // Thời gian hiệu ứng
      >
          {selectedKey === 'assigment' && <div><KoiAssigment/></div>}
          {selectedKey === 'discount' && <div><Discount/></div>}
          {selectedKey === 'user' && <div><UserPoint /></div>}
          {selectedKey === 'request-care' && <div><RequestCare/></div>}
          {selectedKey === 'order-detail' && <div><OrderManagement/></div>}
          {selectedKey === 'feedbacks' && <div><FeedbackManagement/></div>}
          {selectedKey === 'payment' && <div> <PaymentManagement /> </div>}
          </motion.div>
      </div>
      </div>
    </div>
  )
}

export default StaffPage
