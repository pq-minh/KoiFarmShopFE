import Header from "../../component/header";
import StaffAction from "../../component/staff-navbar";
import React from 'react'

const StaffPage = () => {
  return (
    <div>
      <Header/>
      <div className="row">
      <div className="col-2">
      <StaffAction/>
      </div>
      </div>
    </div>
  )
}

export default StaffPage
