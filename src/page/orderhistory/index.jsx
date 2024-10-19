import { useEffect, useState } from 'react';
import api from '../../config/axios';
import Header from '../../component/header';
import './index.scss'; // Import your CSS for styling

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null); // Store the details of the selected order
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Store the currently selected order ID

  // Fetch all orders
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  // Fetch specific order details when an order is clicked
  const handleOrderClick = async (orderId) => {
    setSelectedOrderId(orderId);
    try {
      const response = await api.get(`/orders/${orderId}`);
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
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
                className={`order-card ${selectedOrderId === order.orderId ? 'active' : ''}`}
                onClick={() => handleOrderClick(order.orderId)} // Fetch and show details when clicked
              >
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <p><strong>Date:</strong> {new Date(order.createDate).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}

        {/* Display order details when an order is selected */}
        {orderDetails && selectedOrderId && (
          <div className="order-details">
            <h3>Order Details for Order ID: {selectedOrderId}</h3>
            <ul>
              {orderDetails.map((detail) => (
                <li key={detail.orderDetailsId}>
                  <p><strong>Koi ID:</strong> {detail.koiId}</p>
                  <p><strong>Batch Koi ID:</strong> {detail.batchKoiId ? detail.batchKoiId : 'N/A'}</p>
                  <p><strong>Total Quantity:</strong> {detail.toTalQuantity}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
