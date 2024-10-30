import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Modal, Input, Rate, notification, Card, Col, Row, Breadcrumb } from 'antd';
import api from "../../config/axios";
import Header from '../../component/header';
import './index.scss'; 

const FeedbackPage = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const orderResponse = await api.get('/reviews/orderdetail');
      const reviewResponse = await api.get('/reviews');

      const updatedOrderDetails = orderResponse.data.map(order => ({
        ...order,
        hasFeedback: reviewResponse.data.some(review => 
          review.koiId === order.koiId && review.batchKoiId === order.batchKoiId
        ),
      }));

      setOrderDetails(updatedOrderDetails);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const openFeedbackForm = (order) => {
    setSelectedOrder(order);
    setShowFeedbackForm(true);
  };

  const submitReview = async () => {
    if (!rating || !comments) {
      notification.error({
        message: 'Incomplete Feedback',
        description: 'Please provide both a rating and comments before submitting.',
      });
      return;
    }

    const reviewData = {
      rating,
      comments,
      koiId: selectedOrder.koiId,
      batchKoiId: selectedOrder.batchKoiId
    };

    try {
      await api.post('/reviews', reviewData);
      fetchOrderDetails();
      setRating(0);
      setComments('');
      setShowFeedbackForm(false);

      notification.success({
        message: 'Feedback Submitted',
        description: 'Thank you for your purchase! Your feedback has been submitted successfully.',
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      notification.error({
        message: 'Submission Error',
        description: 'There was an error submitting your feedback. Please try again.',
      });
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Item ID',
      key: 'itemId',
      render: (text, record) => (record.batchKoiId ? record.batchKoiId : record.koiId),
    },
    {
      title: 'Name',
      key: 'name',
      render: (text, record) => (record.batchKoiName ? record.batchKoiName : record.koiName),
    },
    {
      title: 'Quantity',
      dataIndex: 'toTalQuantity',
      key: 'quantity',
    },
    {
      title: 'Image',
      key: 'image',
      render: (text, record) => (
        <img
          src={record.batchKoiImage || record.koiImage || 'placeholder_image_url'}
          alt={record.batchKoiName || record.koiName}
          width="100"
          style={{ borderRadius: '5px' }} 
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          {record.hasFeedback ? (
            <>
              <span style={{ color: '#52c41a' }}>Feedback Submitted</span>
              <Button type="link" onClick={() => openFeedbackForm(record)}>
                Submit Another Feedback
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={() => openFeedbackForm(record)}>
              Submit Feedback
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="feedback-page">
      <Header setIsLoggedIn={setIsLoggedIn} />
       {/* Breadcrumb Navigation */}
       <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/feedback">All Feedback</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Submit Feedback</Breadcrumb.Item>
      </Breadcrumb>
      
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Koi Fish Order Feedback</h2>

      <Row gutter={16} justify="center">
        <Col span={24}>
          <Table columns={columns} dataSource={orderDetails} rowKey="orderDetailsId" pagination={{ pageSize: 5 }} />
        </Col>
      </Row>

      <Modal
        title={`Submit Feedback for Order #${selectedOrder?.orderId}`}
        visible={showFeedbackForm}
        onCancel={() => setShowFeedbackForm(false)}
        footer={[
          <Button key="back" onClick={() => setShowFeedbackForm(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={submitReview}>
            Submit
          </Button>,
        ]}
      >
        <div className="feedback-form">
          <label>Rating:</label>
          <Rate value={rating} onChange={(value) => setRating(value)} />
          
          <label>Comments:</label>
          <Input.TextArea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter your comments"
          />
        </div>
      </Modal>
    </div>
  );
};

export default FeedbackPage;
