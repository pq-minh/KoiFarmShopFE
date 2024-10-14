import React, { useState,useEffect } from 'react'
import Header from "../../component/header";
import CardProduct from "../../component/shop-component/product-card/Card";
import Filter from '../../component/shop-component/product-filter/Filter';
import api from "../../config/axios";
import HorizonFilter from '../../component/shop-component/product-filter/HorizonFilter';
import "./index.scss"
import { Breadcrumb, Flex } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
const Shop = () => {
    const [products,setProducts] = useState([])
    const [filter,setFilter] = useState([])
    //
    const handleFilterData = (data) => {
      setFilter(data)
      setProducts(data)
    }
    //fetching koi 
    useEffect(() => {
        const fetchKoiData = async () => {
          try {
            const response = await api.get("kois/GetAllKoi");
            if (response.status === 200) {
              setProducts(response.data);
            }
          } catch (err) {
            console.log(err);
          }
        };   
        fetchKoiData();
      }, []);
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
            <Filter setData={handleFilterData}/>
        </div>
        <div className='row col-md-9 card-box'>
            <div className='col'>
            <div className='horizon-filter row'>
              <HorizonFilter/>
            </div>
            <CardProduct products={products}/>   
            </div> 
        </div>
     </div>
    </div>
  )
}

export default Shop
