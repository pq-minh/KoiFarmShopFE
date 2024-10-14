import React, { useState,useEffect } from 'react';
import { Radio } from 'antd';
import { Select, Space } from 'antd'
import "./index1.scss"
const HorizonFilter = () => {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
  return (
    <div className='horizon-box'>

    <p>Sản phẩm: </p>
    <div className='koi-batch'> 
        <Radio.Group onChange={onChange} value={value} style={{fontSize:20}}>
         <Radio value={koi}>Koi</Radio>
         <Radio value={2}>Batch Koi</Radio>
        </Radio.Group>
        </div>
        <p>Giá: </p>
        <div className='price-order'>
        <Select
      defaultValue="Sắp xếp theo"
      style={{
        marginLeft:5,
        width: 120,
        height: 30
      }}
      onChange={handleChange}
      options={[
        {
          value: 'asc',
          label: 'Tăng dần',
        },
        {
          value: 'dsc',
          label: 'Giảm dần',
        }
      ]}
    />
        </div>
    </div>
  )
}

export default HorizonFilter
