import React,{useState} from 'react';
import { Card } from 'antd';
import { ShoppingCartOutlined, DollarOutlined,DeleteOutlined ,CloseCircleOutlined} from '@ant-design/icons';
import "./index.scss";
import { InputNumber } from 'antd';

const { Meta } = Card;

const KoiCart = ({carts,setCarts}) => {
  const [formData, setFormData] = useState({
    koiId: null,
    batchKoiId: null
    });
  const handleAddToCart = (batchId) => {
    console.log(formData);
    setFormData(prev => ({ ...prev, batchKoiId: batchId, koiId: null }));
    setCarts(prevCarts => [
      ...prevCarts,
      { batchKoiId: batchId, koiId: null }
    ]);
  };


  return (
    <div className='shopping-cart'>

    {
      carts.map((cart, index) => (
        <Card
        hoverable
        style={{    
          width: 940,
          height: 159,
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: 'whitesmoke',
          paddingRight:260,
          marginTop:10
        }}
        className='card'
      >
        <div className='card-content' style={{ display: 'flex', alignItems: 'center' }}>
          <div className='img-content-shopping' style={{ marginRight: '20px' }}>
            <img
              alt="example"
              src={cart.batchKoiImgUrl == null  ? (cart.koiImgUrl) : (cart.batchKoiImgUrl)}
              style={{ width: '100px', height: '120px' }} 
            />
          </div>
          <div className='card-tittle-des' style={{marginTop:11 }}>
            <Meta title={cart.batchKoiName== null ? (cart.koiName) :(cart.batchKoiName)} className='title' />
            <div className='description' style={{ height: '110px', overflow: 'hidden'}}>
              <p style={{ marginTop:10 }} className='description-cart'>
                {cart.batchKoiDescription == null ? (cart.koiDescription) :(cart.batchKoiDescription)}
              </p>
            </div>
          </div>
          <div style={{marginRight:30, display:"flex"}}>
          <div className='cart-quantity'>
          {
            cart.koiName == null ? (<i><InputNumber min={1} max={100} defaultValue={cart.quantity} onChange={() => handleAddToCart(cart.batchKoiId)}  /></i>) : (
              <i><InputNumber min={1} max={1} defaultValue={1} /></i>
            )
          }
                
          </div>
          <div className='price-cart' style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <h5 style={{ fontSize: "13px" }}>
            <p style={{display:'flex'}}> { 0 || cart.unitPrice.toLocaleString('vi-VN') + ".000VND"}   </p>   
            </h5>

          </div>
          <div  className='icon-remove'>
              <CloseCircleOutlined style={{fontSize:30}} />
              </div>
        </div>
        </div>
      </Card>


      ))
    }
     
    </div>
  );
};

export default KoiCart;
