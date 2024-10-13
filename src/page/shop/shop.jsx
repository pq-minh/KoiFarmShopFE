import React, { useState,useEffect } from 'react'
import Header from "../../component/header";
import CardProduct from "../../component/shop-component/product-card/Card";
import Filter from '../../component/shop-component/product-filter/Filter';
import api from "../../config/axios";
import "./index.scss"
const Shop = () => {
    const [products,setProducts] = useState([])
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

  return (

    <div>
     <Header/>
     <div className='row content'>
        <div className='col-md-3 filter-box'>
            <Filter/>
        </div>
        <div className='row col-md-9 card-box'>
            <div className='col'>
            <CardProduct products={products}/>   
            </div> 
        </div>
     </div>
    </div>
  )
}

export default Shop
