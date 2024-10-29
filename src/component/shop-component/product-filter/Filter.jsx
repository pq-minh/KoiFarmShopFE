import React,{useState , useEffect} from 'react'
import { Select} from 'antd';
import "./index.scss"
import { Input, Radio, Space,Button } from 'antd';
import { SearchOutlined,ClearOutlined } from '@ant-design/icons';
import { Slider, Switch } from 'antd';

import api from "../../../config/axios";
const Filter = ({ setData, KoiOrBatch,products,onReset}) => {
    const listKoiName = ["Onwa","Kohaku","Ogon","Showa","Tancho","Asagi"]
    const listKoiCategory = ["Thuần chủng nhập khẩu", "Lai F1", "Thuần Việt"]
    const [selectedKoi, setSelectedKoi] = useState('');
    const [selectedKoiCat, setSelectedKoiCat] = useState('');
    const [position, setPosition] = useState('end');
    const [filterData, setFilterData] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 2000000]);
    const [sort,setSort] = useState(null);
    //
    const total = KoiOrBatch.length;
    console.log(total);
    //);
    const onChangePrice = (e) =>{
       setPriceRange(e);
    }
    //koi change 
    const onChange = (e) => {
      setSelectedKoi(e.target.value);
    }
    //category change
    const onChangeCat = (e) => {
        setSelectedKoiCat(e.target.value);
      }
      //order change
      const handleChangeOrder = (value) => {
        setSort(value);
        console.log(value);
      }
      //
      const onClickHandle = () =>{
        const fromPrice = priceRange[0]/1000; 
        const toPrice = priceRange[1]/1000
        const newData ={
          koiName: selectedKoi,
          from: fromPrice, 
          to: toPrice, 
          typefish: selectedKoiCat,
          SortBy:sort,
          PageSize: products.length || KoiOrBatch.length
        };
        setFilterData(newData);
      }
      // reset handle 
      const onResetHandle = () => {
        setSelectedKoi('');
        setSelectedKoiCat('');
        setPriceRange([0, 2000000]);
        setSort(null);
        setFilterData(null);
        onReset(); 
    };
      //
      useEffect(() => {
        if (filterData) {
            const fetchKoiData = async () => {
                try {
                    const response = await api.get(`${KoiOrBatch}/modify`, { params: filterData });
                    if (response.status === 200) {                      
                        setData(response.data); 
                        
                    }
                } catch (err) {
                    console.log(err);
                }
            };   
            fetchKoiData();
        } else {
          setData(products)
        }
    }, [filterData,KoiOrBatch,setData, products]);
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
              <Slider
                range
                value={priceRange} 
                min={0}
                max={2000000}
                onChange={onChangePrice}
            />
             <div>
                Giá: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
            </div>
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
    <div className='box-order' style={{display:'flex'}}> 
    <p>Giá:</p>
            <div className='price-order'>
                <Select
                    defaultValue="Sắp xếp theo"
                    style={{
                        marginLeft: 5,
                        width: 120,
                        height: 30,
                    }}
                    onChange={handleChangeOrder}
                    options={[
                        {
                            value: 'price_asc',
                            label: 'Tăng dần',
                        },
                        {
                            value: 'price_desc',
                            label: 'Giảm dần',
                        },
                    ]}
                />
            </div>
            </div>
    <div>
    <div>
    <Button type="primary" icon={<SearchOutlined />} iconPosition={position} style={{width:250,marginTop:10}} onClick={onClickHandle}>
            Search Koi
    </Button>
    </div>
    <div>
    <Button type="primary" icon={<ClearOutlined />} iconPosition={position} style={{width:250,marginTop:10}} onClick={ onResetHandle }>
            Reset
    </Button>
    </div>  
        </div>
  </div>
  )
}

export default Filter
