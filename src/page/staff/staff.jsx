import Header from "../../component/header";
import StaffAction from "../../component/staff-navbar";
import React, { useState } from 'react';
import KoiAssigment from '../../component/staff-action/koi-assigment/KoiAssigment';

import './index.scss';
const StaffPage = () => {
  const [selectedKey, setSelectedKey] = useState('');
  const handleMenuClick = (key) => {
    setSelectedKey(key); 
    console.log('Selected key:', key); 
};
  return (
    <div>
      <Header/>
      <div className="row content">
      <div className="col-2">
      <StaffAction  onMenuClick={handleMenuClick}/>
      </div>
      <div className="col-10">
          {selectedKey === 'assigment' && <div><KoiAssigment/></div>}
          {selectedKey === 'staff' && <div>Staff Management Content</div>}
      </div>
      </div>
    </div>
  )
}

export default StaffPage
