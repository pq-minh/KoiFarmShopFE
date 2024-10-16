import React,{useState , useEffect} from 'react'
import { Select} from 'antd';
import "./index.scss"
import { Input, Radio, Space,Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import api from "../../../config/axios";
const Filter = ({ setData }) => {
    const listKoiName = ["Onwa","Kohaku","Ogon","Showa","Tancho","Asagi"]
    const listKoiCategory = ["Thuần chủng nhập khẩu", "Lai F1", "Thuần Việt"]
    const [selectedKoi, setSelectedKoi] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedKoiCat, setSelectedKoiCat] = useState('');
    const [position, setPosition] = useState('end');
    const [filterData, setFilterData] = useState(null);
    //koi change 
    const onChange = (e) => {
      setSelectedKoi(e.target.value);
    }
    //category change
    const onChangeCat = (e) => {
        setSelectedKoiCat(e.target.value);
      }
      //
      const onClickHandle = () =>{
        const priceRange = selectedPrice.split("-");
        const fromPrice = priceRange[0]; 
        const toPrice = priceRange[1]
        const newData ={
          koiName: selectedKoi,
          from: fromPrice, 
          to: toPrice, 
          koiCategory: selectedKoiCat
        };
        setFilterData(newData);
      }
      //
      useEffect(() => {
        if (filterData) {
            const fetchKoiData = async () => {
                try {
                    const response = await api.get("Kois/modify", { params: filterData });
                    if (response.status === 200) {
                        setData(response.data); // Cập nhật dữ liệu nhận được
                    }
                } catch (err) {
                    console.log(err);
                }
            };   
            fetchKoiData();
        }
    }, [filterData]);
  return (
    <div className='filter'>
    <div className='name-box'>
    <h3>Koi Name</h3>
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
    <h3>Price</h3>
    <Select
      style={{
        width: 180,
      }}
      allowClear
      onChange={(options) => setSelectedPrice(options)}
      options={[
        {
          value: '0-150.000',
          label: '0-150.000',
        },
        {
          value: '150-300.000',
          label: '150-300.000',
        },
        {
          value: '300.000-500.000',
          label: '300.000-500.000',
        },
        {
          value: '500.000-1000.000',
          label: '500.000-1000.000',
        },
      ]}
      placeholder="Price range"
    />
    </div>
    <div className='category-box'>
    <h3>Koi Category</h3>
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
    <Button type="primary" icon={<SearchOutlined />} iconPosition={position} style={{width:250}} onClick={onClickHandle}>
            Search Koi
    </Button>
        </div>
  </div>
  )
}

export default Filter
