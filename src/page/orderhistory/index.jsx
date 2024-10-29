import { useEffect, useState } from "react";
import api from "../../config/axios";
import Header from "../../component/header";
import Modal from "../../component/Modal/modal";
import "./index.scss";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedKoiDetail, setSelectedKoiDetail] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

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
    setSelectedOrderId(orderId);
    try {
      const response = await api.get(`/orders/${orderId}`);
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  // Fetch and open modal with koi fish details
  const handleKoiDetailClick = async (koiId) => {
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

  return (
    <div>
      <Header />
      <div className="order-history-container">
        <h2>Order History</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className={`order-card ${selectedOrderId === order.orderId ? "active" : ""}`}
                onClick={() => handleOrderClick(order.orderId)}
              >
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                <p className={`status ${order.orderStatus === "Pending" ? "Completed" : ""}`}>
                  <strong>Status:</strong> {order.orderStatus}
                </p>
                <p><strong>Date:</strong> {new Date(order.createDate).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}

        {orderDetails && selectedOrderId && (
          <div className="order-details-container">
            <div className="order-details">
              <h3>Order Details for Order ID: {selectedOrderId}</h3>
              <div className="details-list">
                {orderDetails.map((detail) => (
                  <div 
                    key={detail.orderDetailsId} 
                    className="detail-card"
                    onClick={() => handleKoiDetailClick(detail.koiId)} // Use koiId to fetch details
                  >
                    <div className="image-container">
                      <img
                        src={detail.koiImage}
                        alt={detail.koiName}
                        className="koi-image"
                      />
                    </div>
                    <div className="info-container">
                      <p><strong>Koi Name:</strong> {detail.koiName}</p>
                      <p><strong>Total Quantity:</strong> {detail.toTalQuantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal to show koi fish details */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
  {selectedKoiDetail && (
    <div className="koi-detail-modal">
      <h3>Koi Details</h3>
      <div className="image-container">
        <img
          src={selectedKoiDetail.image}
          alt={selectedKoiDetail.name}
          className="koi-image"
        />
      </div>
      <div className="info-container">
        <div className="info-fields"> {/* Thêm lớp này */}
          <div className="info-field">
            <strong>Koi Name:</strong> {selectedKoiDetail.name}
          </div>
          <div className="info-field">
            <strong>Type:</strong> {selectedKoiDetail.typeFish}
          </div>
          <div className="info-field">
            <strong>Origin:</strong> {selectedKoiDetail.origin}
          </div>
          <div className="info-field">
            <strong>Description:</strong> {selectedKoiDetail.description}
          </div>
          <div className="info-field">
            <strong>Gender:</strong> {selectedKoiDetail.gender}
          </div>
          <div className="info-field">
            <strong>Age:</strong> {selectedKoiDetail.age} years
          </div>
          <div className="info-field">
            <strong>Weight:</strong> {selectedKoiDetail.weight} kg
          </div>
          <div className="info-field">
            <strong>Size:</strong> {selectedKoiDetail.size} cm
          </div>
          <div className="info-field">
            <strong>Personality:</strong> {selectedKoiDetail.personality}
          </div>
          <div className="info-field">
            <strong>Status:</strong> {selectedKoiDetail.status}
          </div>
          <div className="info-field">
            <strong>Price:</strong> ${selectedKoiDetail.price}
          </div>
          <div className="info-field">
            <strong>Certificate:</strong> {selectedKoiDetail.certificate}
          </div>
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
