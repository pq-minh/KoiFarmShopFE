import React, { useState, useEffect } from 'react';
import { Space, Table, Modal } from 'antd';
import api from '../../config/axios';
import "./order.scss";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Format total amount
  const formatCurrency = (amount) => {
    return `${amount.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND`;
  };

  // Gọi dữ liệu order
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetchOrderHistory();
  }, []);

  // Gọi dữ liệu order details
  const handleOrderClick = async (orderId) => {
    setSelectedOrderId(orderId);
    try {
      const response = await api.get(`/orders/${orderId}`);
      setOrderDetails(response.data);
      console.log(orderDetails)
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handleViewDetails = (record) => {
    handleOrderClick(record.orderId);
    setModalVisible(true);
  };

  // Setup table
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 150,
      align: 'center',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 150,
      render: (text) => formatCurrency(text),
      align: 'center',
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
      width: 250,
      align: 'center',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'orderStatus',
      width: 150,
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button className='btn-viewDetails' onClick={() => handleViewDetails(record)}>View Details</button>
          <a>Care Koi</a>
        </Space>
      ),
      width: 200,
      align: 'center',
    },
  ];

  return (
    <div className='order-table'>
      <Table bordered={true} columns={columns} dataSource={orders} />
      <Modal
  title="View Order Details"
  open={isModalVisible}
  onCancel={() => setModalVisible(false)}
  footer={null}
  width={1000}
>
  {orderDetails && orderDetails.length > 0 ? (
    <div>
      {orderDetails.map((item, index) => (
        <div key={index} className='row product-details1'>
            <img  className='product-img'
              src={item.koiImage || item.batchKoiImage || '/path/to/default/image.jpg'} 
              alt={item.koiName || item.batchKoiName || 'Koi Image'}
            />
          <div className='col product-infor'>
            <p>Koi name: {item.koiName || item.batchKoiName || 'Unknown Koi'}</p>
            <p>Price: {item.koiPrice > 0 ? formatCurrency(item.koiPrice) : formatCurrency(item.batchPrice)}</p>
            <p>Total Quantity: {item.toTalQuantity || 0}</p>
            {item.certificate && (
              <a href={item.certificate} target="_blank" rel="noopener noreferrer">View Certificate</a>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>No order details available.</p>
  )}
</Modal>
    </div>
  );
}

export default Order;
