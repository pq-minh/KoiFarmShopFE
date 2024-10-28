import React,{useState} from 'react'
import TableAssigment from '../../component/assigmentCP/table-assigment/TableAssigment'
import Header from '../../component/header'
import { motion } from 'framer-motion';
const AssignmentHistory = () => {
  //motion
  const tableVariants = {
    hidden: { opacity: 0, y: 20 },  
    visible: { opacity: 1, y: 0 }    
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Header setIsLoggedIn={setIsLoggedIn}/>
     <div className='row'>
     <div className=' col-12 table-assiment'>
     <motion.div
      initial="hidden"
      animate="visible"
      variants={tableVariants}
      transition={{ duration: 0.5 }}  // Thời gian hiệu ứng
    >
             <TableAssigment/>
             </motion.div>  
      </div>
      </div>
    </div>
  )
}

export default AssignmentHistory
