import React from 'react'
import TableAssigment from '../../component/assigmentCP/table-assigment/TableAssigment'
import Header from '../../component/header'
const AssignmentHistory = () => {
  return (
    <div>
     <Header/>
     <div className='row'>
     <div className='col-2 nav-side'>

     </div>
     <div className=' col-10 table-assiment'>
             <TableAssigment/>
      </div>
      </div>
    </div>
  )
}

export default AssignmentHistory
