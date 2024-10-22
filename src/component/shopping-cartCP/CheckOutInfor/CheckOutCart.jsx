import React, { useState ,useEffect,useContext } from 'react';
import { Table, Input, Form, Radio, Button , message} from 'antd';
import "./index.scss"
import api2 from '../../../config/axios2';
import api from '../../../config/axios';
const CheckOutInfor = ({carts}) => {
  const [discount, setDiscount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [address, setAddress] = useState([]);
  const [discountValue, setDiscountValue] = useState(null);
  const [discountId, setDiscountId] = useState(null);
  const totalAmount = carts.reduce((sum, cart) => sum + cart.totalPrice, 0); 
  const [errorMessage, setErrorMessage] = useState('')
  const [messageApi, contextHolder] = message.useMessage();
  const [phoneNumber, setPhoneNumber] = useState(null)
  //goi address
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("address/getall-address");
        if (response.status === 200) { 
          setAddress(response.data[0] || {});
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); // Gọi hàm fetchData
  }, []);


  //

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  //chuyển thành vnd 
  const formattedAmount = `$${totalAmount.toLocaleString('vi-VN')}.000 VND`

  const finalAmount = (totalAmount - (totalAmount * (discountValue / 100)));

  const formattedFinalAmount = `${finalAmount.toLocaleString('vi-VN')}.000 VND`
  const data = [
    {
      key: '1',
      description: 'Tổng tiền',
      amount: formattedAmount,
    },
    { 
      key: '2',
      description: 'Giảm giá',
      amount: `-$${(totalAmount * (discountValue  / 100)).toFixed(3)}`,
    },
    {
      key: '3',
      description: 'Số tiền cuối',
      amount: `$${formattedFinalAmount}`,
    },
    {
      key: '4',
      description: 'Phương thức thanh toán',
      amount: paymentMethod === 'online' ? 'Online' : 'Offline',
    },
  ];
  
  //hàm gọi respon value của discount

    const handleCheckDiscount = async () => {
      try {
        const response = await api2.post("discounts",{"name":discount});
        if (response.status === 200) {
            setDiscountValue(response.data.discountRate)
            setDiscountId(response.data.discountId)
            setErrorMessage("Success");
          } else if (response.status === 204) {
            setErrorMessage("Không tồn tại mã giảm giá này");
            setDiscountValue(null);
          }        
      } catch (err) {
        console.log(err);
        setErrorMessage("An error occurred while checking the discount. ");
      }
    };   
  //

    useEffect(() => {
      if (errorMessage === "Success") {
        message.success('Mã giảm giá được áp dụng thành công'); 
      } else if (errorMessage) {
        message.error(errorMessage); 
      }
    },[errorMessage]);
    // xứ lý add to order
    const handleAddToOrder =async () => {
      const orderData = {
        carts: carts.map((cart) =>({
          koiId: cart.koiId || null,
          batchKoiId: cart.batchKoiId || null,
          quantity: cart.quantity,
          })), 
        method: paymentMethod,
        discountId: discountId || 0, 
        phoneNumber: phoneNumber || null, 
        address: `${address.city || ''}, ${address.dictrict || ''}, ${address.ward || ''}, ${address.streetName || ''}`, // Địa chỉ
        }
        
      console.log(orderData); 
      try{
          const response = await api2.post("OrderPayment/create-payment");
          if(response.status == 200) {
            if (paymentMethod === 'online') {
              const redirectUrl = response.data.redirectUrl;
              window.location.href = redirectUrl; 
            } else {
              message.success('Đơn hàng đã được tạo thành công');
            }
          }
      } catch(err){
        console.log(err);
      }
    };

  return (
    <div className='checkout-infor-cp'>
      <Form layout="inline" onFinish={handleAddToOrder}>
      <Form.Item label="" style={{display:"flex",justifyContent:"center" , alignItems:"center"}}>
          <h5>Thong tin thanh toan</h5>
        </Form.Item>
        <Form.Item label="Nhập giảm giá (%)">
          <Input
            onChange={(e) => setDiscount(e.target.value)} 
            placeholder="Giảm giá"
          />
        </Form.Item>
        <Form.Item>
        <Button type="primary" onClick={handleCheckDiscount}>Check</Button>
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
       <Input placeholder="Your Shipping Address"  value={`${address.city || ''}, ${address.dictrict || ''}, ${address.ward || ''}, ${address.streetName || ''}`} style={{ flex: 1,width:315  }} />
      </Form.Item>
      <Form.Item label="Phone number:" style={{ display: 'flex', alignItems: 'center',marginTop:10 }}>
       <Input placeholder="your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ flex: 1,width:330 }} />
      </Form.Item>
        <Form.Item label="Phương thức thanh toán" value={"123456"} style={{marginTop:10,marginRight:200}}>
          <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod}>
            <Radio value="online">Online</Radio>
            <Radio value="offline">Offline</Radio>
          </Radio.Group>
        </Form.Item>
          <Button type="primary" htmlType="submit">Xác nhận</Button>
        </Form>
    </div>
  );
};

export default CheckOutInfor;
