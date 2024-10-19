
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button, Form, Input, Row, Col,Select } from "antd";
import api from "../../config/axios";
import { Space, Table, Tag } from 'antd';

import axios from 'axios';
function Address(){
    const [provine, setProvine] = useState([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const [district,SetDistrict] = useState([]);
    const [ward,SetWard] = useState([]);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState([]);
    const [haveAddress, setHaveAddress] = useState(false);

    //setup table 
    const columns = [
      {
        title: 'Tỉnh/Thành Phố',
        dataIndex: 'address',
        key: 'address',
        render: (text) => <a>{text}</a>,
      },      
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];
    //data table 
    const showAddress = (address) => {
      return address.map((add) => ({
          key: add.add, 
          address: `${add.city}, ${add.dictrict}, ${add.ward}, ${add.streetName}`,
      }));
  };
  const data = showAddress(address);
    //fetching addresses of user to check aviable for address
    useEffect(() => {
      const fetchData = async (url) => {
        try {
          const token = sessionStorage.getItem('token')?.replaceAll('"', '');
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Đính kèm token vào header
              'Content-Type': 'application/json-patch+json',
            },  
          });  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }  
          const data = await response.json();
          if (data && Object.keys(data).length > 0) {
            setHaveAddress(true);
            setAddress(data);
          } else {
            setHaveAddress(false);
          }
        } catch (err) {
          console.error('API call failed:', err);
        }
      };  
      fetchData('https://localhost:7228/api/address/getall-address');
    }, []);
    //handle change Provine 
    const handleChange = (value) => {
        const selectedProvince = provine.find(province => province.name === value);
        setSelectedProvinceId(selectedProvince ? selectedProvince.id : null);  
        console.log('Selected Province ID:', selectedProvince ? selectedProvince.id : null);
    }
    //handle change District
    const handleChangeDistrict = (value) => {
        const selectedDistrict = district.find(district => district.name === value);
        setSelectedDistrictId(selectedDistrict ? selectedDistrict.id : null);  
        console.log('Selected District ID:', selectedDistrict ? selectedDistrict.id : null);
    }
    //handle post address
    const handleConfirmAddress = async (values) => {
        console.log(values);    
         try {     
           const response = await api.post("address/create-address", values);
          if(response.status === 200) {
            //  localStorage.setItem("token", response.data.token);
            //  window.location.reload();
            console.log(response.data); 
           }
         } catch (err) {
           console.log(err);
         }
      };
    // Function to fetch data
    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            throw err; // Throw error to be caught in useEffect
        }
    };
    // gọi provine
    useEffect(() => {
        fetchData('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(receivedData => {
                console.log('Provine received:', receivedData.data.name);
                const newProvinces = receivedData.data.map(province => ({
                    id: province.id,
                    name: province.name
                }));
                setProvine(newProvinces); // Update state with received data
            })
            .catch(err => {
                console.error('API call failed:', err);
                setError(err); // Update state with error
            });
    }, []);

    //goi dictrict
    useEffect(() => {
        fetchData(`https://esgoo.net/api-tinhthanh/2/${selectedProvinceId}.htm`)
            .then(receivedData => {
                console.log('District received:', receivedData.data);
                const newDistrict = receivedData.data.map(district => ({
                    id: district.id,
                    name: district.name
                }));
                SetDistrict(newDistrict); // Update state with received data
            })
            .catch(err => {
                console.error('API call failed:', err);
                setError(err); // Update state with error
            });
    }, [selectedProvinceId]);
    //goi xã
    useEffect(() => {
        fetchData(`https://esgoo.net/api-tinhthanh/3/${selectedDistrictId}.htm`)
            .then(receivedData => {
                console.log('Ward received:', receivedData.data);
                const newWard = receivedData.data.map(ward => ({
                    id: ward.id,
                    name: ward.name
                }));
                SetWard(newWard); // Update state with received data
            })
            .catch(err => {
                console.error('API call failed:', err);
                setError(err); // Update state with error
            });
    }, [selectedDistrictId]);


        return(
            <div className="cpass-form">
            {haveAddress ? (
  <div className="address-container">
      <Table columns={columns} dataSource={data} />
  </div>
) :  <Form
            className="form"
            labelCol={{
              span: 24,
            }}
            onFinish={handleConfirmAddress}
          >
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "1.5rem",
                color: "#333",
              }}
            >
              Your Shipping Address
            </div>

            
            <Row gutter={20}>
              <Col span={20}>
                <Form.Item
                  label="Tỉnh/Thành Phố"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your provinece",
                    },
                  ]}
                >
                  <Select
                        style={{ width: '100%', fontSize: '16px' }}
                        placeholder="Chọn Tỉnh/Thành Phố"
                        onSelect={handleChange}
                    >

                    {
                        provine.map((item) =>(
                            <Option key={item.id} value={item.name} >
                             {item.name}
                          </Option>
                        ))
                    }
                        
                    </Select>
                </Form.Item>
               
              </Col>      
            </Row>
        
            <Row gutter={20}>
              <Col span={20}>
                <Form.Item
                  label="Quận/Huyện"
                  name="dictrict"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a new password",
                    },
                  ]}
                >
                  <Select
                        style={{ width: '100%', fontSize: '16px' }}
                        placeholder="Chọn Quận/Huyện"
                        onSelect={handleChangeDistrict}>
                        
                    {
                        district.map((item) =>(
                            <Option key={item.id} value={item.name} >
                             {item.name}
                          </Option>
                        ))
                    }
                        
                    </Select>
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={20}>
              <Col span={20}>
                <Form.Item
                  label="Phường Xã"
                  name="ward"
                  rules={[
                    {
                      required: true,
                      message: "Please enter ward",
                    },
                  ]}
                >
                <Select
                        style={{ width: '100%', fontSize: '16px' }}
                        placeholder="Chọn xã"
>
                        
                    {
                        ward.map((item) =>(
                            <Option key={item.id} value={item.name} >
                             {item.name}
                          </Option>
                        ))
                    }
                        
                    </Select>
                </Form.Item>
              </Col>
            </Row>
               
            <Row gutter={20}>
              <Col span={20}>
                <Form.Item
                  label="Tên Đường"
                  name="streetName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter ward",
                    },
                  ]}
                >
                  <Input style={{ width: '100%', fontSize: '16px' }} type="text" placeholder="Tên Đường" />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Confirm Address
              </Button>
            </Form.Item>

            
          </Form>}
       
       </div> 
        )
}

export default Address