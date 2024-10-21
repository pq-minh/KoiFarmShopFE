import React from 'react'
import TableAssigment from '../../component/assigmentCP/table-assigment/TableAssigment'
import Header from '../../component/header'
const AssignmentHistory = () => {
  return (
    <div>
     <Header/>
     <div className='row'>
     <div className=' col-12 table-assiment'>
             <TableAssigment/>
      </div>
      </div>
    </div>
  )
}

export default AssignmentHistory
