import React, { useState ,useEffect,useContext } from 'react';
import { Table, Input, Form, Radio, Button , message} from 'antd';
import { Link, useNavigate } from "react-router-dom";
import "./index.scss"
import api2 from '../../../config/axios2';
import api from '../../../config/axios';
const CheckOutInfor = ({carts,setOrderData}) => {
  const [discount, setDiscount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [address, setAddress] = useState({
    city: '',
    dictrict: '',
    ward: '',
    streetName: ''
  });
  const navigate = useNavigate();
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
    console.log(paymentMethod)
  };
  //chuyển thành vnd 
  const formattedAmount = `${totalAmount.toLocaleString('vi-VN')}.000 VND`

  const finalAmount = (totalAmount - (totalAmount * (discountValue / 100)));

  const formattedFinalAmount = `${finalAmount.toLocaleString('vi-VN')}.000 VND`
  const data = [
    {
      key: '1',
      description: 'Total amount',
      amount: formattedAmount,
    },
    { 
      key: '2',
      description: 'Discount',
      amount: `-${(totalAmount * (discountValue  / 100)).toFixed(3)}`,
    },
    {
      key: '3',
      description: 'Final amount',
      amount: `${formattedFinalAmount}`,
    },
    {
      key: '4',
      description: 'Payment method',
      amount: paymentMethod === 'online' ? 'online' : 'offline',
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
            setErrorMessage("The discount code does not exist or has expired");
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
        message.success('Discount code applied successfully'); 
      } else if (errorMessage) {
        message.error(errorMessage); 
      }
    },[errorMessage]);
    // xứ lý add to order
    const handleAddToOrder = async () => {
      // Validate input data
      if (!carts.length) {
        message.error('The cart is empty.');
        return;
      }
    
      const orderData = {
        carts: carts.map(cart => ({
          koiId: cart.koiId || null,
          batchKoiId: cart.batchKoiId || null,
          quantity: cart.quantity,
        })),
        method: paymentMethod,
        discountId: discountId || 0,
        phoneNumber: phoneNumber || null,
        address: `${address.city || ''}, ${address.district || ''}, ${address.ward || ''}, ${address.streetName || ''}` ,
      };
     setOrderData(orderData)
      console.log(orderData);
      localStorage.setItem('carts', JSON.stringify(orderData));
      try {
        const response = await api.post("orders/createpayment", {
          amount: Math.round(finalAmount)*1000, 
          createdDate: new Date().toISOString(),
        });
    
        if (response.status === 200) {
          if (paymentMethod === 'online') {
            const redirectUrl = response.data.paymentUrl;
            localStorage.setItem("payment", JSON.stringify(redirectUrl));
            console.log(redirectUrl);
            window.location.href = redirectUrl;
          } else {

            const orderData = JSON.parse(localStorage.getItem('carts'));
            const payload = {
              carts: orderData.carts,
              method: orderData.method,
              discountId: orderData.discountId || 0,
              phoneNumber: orderData.phoneNumber || null,
              address: orderData.address,
          };
            const response2= await api.post("orders",payload)
            if (response2.status == 204){
              message.success("Order created successfully");
              localStorage.removeItem('carts');  
              navigate('/completepayment');
          }
          }
        }
      } catch (err) {
        console.error(err);
        message.error('An error occurred while creating the order. Please try again.');
      }
    };
    //handle change address
    const handleChangeAddress = (value, field) => {
      setAddress({
        ...address,
        [field]: value.trim() 
      });
    };
    const addressValue = address.city || address.district || address.ward || address.streetName
    ? `${address.city}, ${address.district}, ${address.ward}, ${address.streetName}`
    : '';
  return (
    <div className='checkout-infor-cp'>
      <Form layout="inline" onFinish={handleAddToOrder}>
      <Form.Item label="" style={{display:"flex",justifyContent:"center" , alignItems:"center",width:300,marginLeft:100}}>
          <h5>Payment information</h5>
        </Form.Item>
        <Form.Item label="Enter discount(%)">
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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
          },
        ]}
        style={{width: '90%'}}
        dataSource={data}
        pagination={false}
      />
       
       <Form.Item label="City:" style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
          <Input
            placeholder="Your Shipping Address"
            value={address.city}
            onChange={(e) => handleChangeAddress(e.target.value, 'city')}
            style={{ flex: 1, width: 315 }}
          />
        </Form.Item>

        <Form.Item label="District:" style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
          <Input
            value={address.dictrict}
            onChange={(e) => handleChangeAddress(e.target.value, 'district')}
            placeholder="District"
            style={{ flex: 1, width: 315 }}
          />
        </Form.Item>

        <Form.Item label="Ward:" style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
          <Input
            value={address.ward}
            onChange={(e) => handleChangeAddress(e.target.value, 'ward')}
            placeholder="Ward"
            style={{ flex: 1, width: 315 }}
          />
        </Form.Item>

        <Form.Item label="Street Name:" style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
          <Input
            value={address.streetName}
            onChange={(e) => handleChangeAddress(e.target.value, 'streetName')}
            placeholder="Street Name"
            style={{ flex: 1, width: 315 }}
          />
        </Form.Item>
      <Form.Item label="Phone number:" style={{ display: 'flex', alignItems: 'center',marginTop:10 }}>
       <Input placeholder="your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ flex: 1,width:330 }} />
      </Form.Item>
        <Form.Item label="Payment Method" value={paymentMethod} style={{marginTop:10,marginRight:200}}>
          <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod}>
            <Radio value="online">Online</Radio>
            <Radio value="offline">Offline</Radio>
          </Radio.Group>
        </Form.Item>
          <Button type="primary" htmlType="submit" style={{width:500}}>Xác nhận</Button>
        </Form>
    </div>
  );
};

export default CheckOutInfor;
