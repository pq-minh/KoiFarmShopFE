import React, { useState,useEffect } from 'react'
import Header from "../../component/header";
import CardProduct from "../../component/shop-component/product-card/Card";
import Filter from '../../component/shop-component/product-filter/Filter';
import api from "../../config/axios";
import HorizonFilter from '../../component/shop-component/product-filter/HorizonFilter';
import "./index.scss"
import { Breadcrumb, Flex,Button } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import Comparison from '../../component/comparison/Comparison';
import Draggable from 'react-draggable';
import { motion } from 'framer-motion';
const Shop = () => {
    const [products,setProducts] = useState([])
    const [filter,setFilter] = useState([])
    const [koiorbatch,setKoiorBatch] = useState("kois")
    const [SortBy,setsortBy] = useState('')
    const [isComparisonVisible, setComparisonVisible] = useState(false); // State để điều khiển modal
    const [productone,setProductOne] = useState(null);
    const [producttwo,setProductTwo] = useState(null);
    //
    const handleProductOne = (data) =>{
        setProductOne(data)
    }
    const handleProductTwo = (data) =>{
      setProductTwo(data)
    }
    //
    const handleFilterData = (data) => {
      setFilter(data)
      setProducts(data)
    }
    //
    const handleFilterKoiOrBatch = (data) => {
      setKoiorBatch(data);
      console.log(data)
    }
     //
     const handleShortBy = (data) => {
      setsortBy(data);
      console.log(data)
    }
    //fetching koi 
    useEffect(() => {
        const fetchKoiData = async () => {
          try {
            const response = await api.get(`${koiorbatch}`);
            if (response.status === 200) {
              setProducts(response.data);
            }
          } catch (err) {
            console.log(err);
          }
        };   
        fetchKoiData();
      }, [koiorbatch]);
      //fetching filter 
      
  return (

    <div>
     <Header/>
     <Breadcrumb style={{backgroundColor:'#fff',display:Flex,position:'relative'}}
    items={[
      {
        href: '/',
        title: <HomeOutlined />,
      },
      {
        title: 'Products',
      },
    ]}
  />
     <div className='row content'>
        <div className='col-md-3 filter-box'>
        <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5 }}
        >
            <Filter setData={handleFilterData} KoiOrBatch={koiorbatch} products={products}/>
            </motion.div>
        </div>
        <div className='row col-md-9 card-box'>
            <div className='col'>
            <div className='horizon-filter row'>
              <HorizonFilter setValue={handleFilterKoiOrBatch} setsortBy={handleShortBy}/>
            </div>
            <CardProduct products={products} setProductOne={handleProductOne} setProductTwo={handleProductTwo}/>   
            
            </div> 
        </div>
        <div className='comparison-box'>
                    <Button onClick={() => setComparisonVisible(true)}>So Sánh Sản Phẩm</Button>
                    <Comparison visible={isComparisonVisible} onClose={() => setComparisonVisible(false)} setProductOne={setProductOne} 
          setProductTwo={setProductTwo}  productone={productone} producttwo = {producttwo} />
        </div>
     </div>
    
    </div>
    
  )
}

export default Shop
