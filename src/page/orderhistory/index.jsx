import { useEffect, useState, useRef } from "react";
import api from "../../config/axios";
import Header from "../../component/header";
import Modal from "../../component/Modal/modal";
import { Table, Button } from "antd"; // Import Ant Design components
import "./index.scss";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedKoiDetail, setSelectedKoiDetail] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Create a ref to the order details container
  const orderDetailsRef = useRef(null);

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

  const handleOrderClick = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      setOrderDetails(response.data);
      
      // Scroll to the order details section
      orderDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  // Fetch and open modal with koi fish details
  const handleKoiDetailClick = async (koiId) => {
    if (!koiId) return; // Add a check to avoid undefined koiId
    try {
      const response = await api.get(`/kois/${koiId}`);
      setSelectedKoiDetail(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching koi details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedKoiDetail(null);
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: amount => `VND${amount}`, 
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: status => (
        <span className={`status ${status.toLowerCase()}`}> {/* Ensure lowercase */}
      {status}
    </span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createDate',
      key: 'createDate',
      render: date => new Date(date).toLocaleString(), 
    },
    {
      title: 'Details',
      key: 'details',
      render: (_, order) => (
        <Button onClick={() => handleOrderClick(order.orderId)}>View Details</Button>
      ),
    },
  ];

  return (
    <div>
      <Header setIsLoggedIn={setIsLoggedIn} />
      <div className="order-history-container">
        <h2>Order History</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <Table
            dataSource={orders}
            columns={columns}
            rowKey="orderId"
          />
        )}

        {/* Order Details Table */}
        {orderDetails && (
          <div ref={orderDetailsRef} className="order-details-container">
            <h3>Order Details for Order ID: {orderDetails.orderId}</h3>
            <Table
              dataSource={orderDetails}
              rowKey="orderDetailsId"
              columns={[
                {
                  title: 'Koi Name',
                  dataIndex: 'koiName',
                  key: 'koiName',
                },
                {
                  title: 'Total Quantity',
                  dataIndex: 'toTalQuantity',
                  key: 'toTalQuantity',
                },
                {
                  title: 'View Detail',
                  key: 'viewDetail',
                  render: (_, detail) => (
                    <Button onClick={() => handleKoiDetailClick(detail.koiId)}>View Detail</Button>
                  ),
                },
              ]}
            />
          </div>
        )}

        {/* Modal to show koi fish details */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedKoiDetail && (
            <div className="koi-detail-modal">
              <h3>Koi Details</h3>
              <div className="image-container">
                <img
                  src={selectedKoiDetail.koiImage}
                  alt={selectedKoiDetail.name}
                  className="koi-image"
                />
              </div>
              <div className="info-container">
                <div className="info-fields">
                  <div className="info-field"><strong>Koi Name:</strong> {selectedKoiDetail.name}</div>
                  <div className="info-field"><strong>Type:</strong> {selectedKoiDetail.typeFish}</div>
                  <div className="info-field"><strong>Origin:</strong> {selectedKoiDetail.origin}</div>
                  <div className="info-field"><strong>Description:</strong> {selectedKoiDetail.description}</div>
                  <div className="info-field"><strong>Gender:</strong> {selectedKoiDetail.gender}</div>
                  <div className="info-field"><strong>Age:</strong> {selectedKoiDetail.age} years</div>
                  <div className="info-field"><strong>Weight:</strong> {selectedKoiDetail.weight} kg</div>
                  <div className="info-field"><strong>Size:</strong> {selectedKoiDetail.size} cm</div>
                  <div className="info-field"><strong>Personality:</strong> {selectedKoiDetail.personality}</div>
                  <div className="info-field"><strong>Status:</strong> {selectedKoiDetail.status}</div>
                  <div className="info-field"><strong>Price:</strong> ${selectedKoiDetail.price}</div>
                  <div className="info-field"><strong>Certificate:</strong> {selectedKoiDetail.certificate}</div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
