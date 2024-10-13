import React,{useState} from 'react'
import { Select} from 'antd';
import { Input, Radio, Space,Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const Filter = () => {
    const listKoiName = ["Onwa","Kohaku","Ogon","Showa","Tancho","Asagi"]
    const listKoiCategory = ["Thuần chủng nhập khẩu", "Lai F1", "Thuần Việt"]
    const [selectedKoi, setSelectedKoi] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedKoiCat, setSelectedKoiCat] = useState('');
    const [position, setPosition] = useState('end');

    const onChange = (e) => {
      console.log(e.target.value);
      setSelectedKoi(e.target.value);
    }
    const onChangeCat = (e) => {
        console.log(e.target.value);
        setSelectedKoiCat(e.target.value);
      }
  return (
    <div className='filter'>
    <div className='name-box'>
    <h2>Koi Name</h2>
    <Radio.Group onChange={onChange} value={selectedKoi}>
      <Space direction="vertical">
        {
            listKoiName.map((item) => (
                <Radio key={item} value={item}>{item}</Radio>
            ))
        }
      </Space>
    </Radio.Group>
    </div>
    <div className='price-box'>
    <h2>Price</h2>
    <Select
      style={{
        width: 180,
      }}
      allowClear
      onChange={(options) => setSelectedPrice(options)}
      options={[
        {
          value: '0-150.000đ',
          label: '0-150.000đ',
        },
        {
          value: '150-300.000đ',
          label: '150-300.000đ',
        },
        {
          value: '300.000-500.000đ',
          label: '300.000-500.000đ',
        },
        {
          value: '500.000-1000.000đ',
          label: '500.000-1000.000đ',
        },
      ]}
      placeholder="Price range"
    />
    </div>
    <div className='category-box'>
    <h2>Koi Category</h2>
    <Radio.Group onChange={onChangeCat} value={selectedKoiCat}>
      <Space direction="vertical">
        {
            listKoiCategory.map((item) => (
                <Radio key={item} value={item}>{item}</Radio>
            ))
        }
      </Space>
    </Radio.Group>
    </div>
    <div>
    <Button type="primary" icon={<SearchOutlined />} iconPosition={position} style={{width:250}}>
            Search Koi
    </Button>
        </div>
  </div>
  )
}

export default Filter
