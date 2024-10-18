import React, { useState ,useEffect } from 'react';
import { Table, Input, Form, Radio, Button } from 'antd';
import "./index.scss"


const CheckOutInfor = ({carts}) => {
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [address, setAddress] = useState([]);
  const totalAmount = carts.reduce((sum, cart) => sum + cart.totalPrice, 0); 
  //goi address
  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const token = localStorage.getItem('token')?.replaceAll('"', '');
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json-patch+json',
          },  
        });  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }  
        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          setAddress(data);
        } 
      } catch (err) {
        console.error('API call failed:', err);
      }
    };  
    fetchData('https://localhost:7228/api/address/getall-address');
  }, []);
  //
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  //chuyển thành vnd 
  const formattedAmount = `${totalAmount.toLocaleString('vi-VN')}.000 VND`

  const finalAmount = (totalAmount - (totalAmount * (discount / 100))).toFixed(2);

  const data = [
    {
      key: '1',
      description: 'Tổng tiền',
      amount: formattedAmount,
    },
    { 
      key: '2',
      description: 'Giảm giá',
      amount: `-$${(totalAmount * (discount / 100)).toFixed(2)}`,
    },
    {
      key: '3',
      description: 'Số tiền cuối',
      amount: `$${finalAmount}`,
    },
    {
      key: '4',
      description: 'Phương thức thanh toán',
      amount: paymentMethod === 'online' ? 'Online' : 'Offline',
    },
  ];

  return (
    <div>
      <Form layout="inline">
      <Form.Item label="" style={{display:"flex",justifyContent:"center" , alignItems:"center"}}>
          <h5>Thong tin thanh toan</h5>
        </Form.Item>
        <Form.Item label="Nhập giảm giá (%)">
          <Input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Giảm giá"
          />
        </Form.Item>
        <Table
        columns={[
          {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
          },
        ]}
        style={{width: '90%'}}
        dataSource={data}
        pagination={false}
      />
       
       <Form.Item label="Shipping address:" style={{ display: 'flex', alignItems: 'center',marginTop:10 }}>
       <Input placeholder="Your Shipping Address" style={{ flex: 1,width:315  }} />
      </Form.Item>
      <Form.Item label="Phone number:" style={{ display: 'flex', alignItems: 'center',marginTop:10 }}>
       <Input placeholder="your phone number" style={{ flex: 1,width:330 }} />
      </Form.Item>
        <Form.Item label="Phương thức thanh toán" style={{marginTop:10,marginRight:200}}>
          <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod}>
            <Radio value="online">Online</Radio>
            <Radio value="offline">Offline</Radio>
          </Radio.Group>
        </Form.Item>
          <Button type="primary">Xác nhận</Button>
        </Form>
    </div>
  );
};

export default CheckOutInfor;
