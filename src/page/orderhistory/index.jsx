import { useEffect, useState, useRef } from "react";
import api from "../../config/axios";
import Header from "../../component/header";
import Modal from "../../component/Modal/modal";
import { Table, Button } from "antd"; // Import Ant Design components
import "./index.scss";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]); // Store order details list
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
      setOrderDetails(response.data.filter(detail => detail.orderId === orderId)); // Filter by orderId

      // Scroll to the order details section
      orderDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const handleKoiDetailClick = async (koiId, batchKoiId = null) => {
    try {
      const response = await api.get("/koisandbatchkois/id", {
        params: {
          koiId: koiId || undefined,
          batchKoiId: batchKoiId || undefined,
        },
      });

      // Ưu tiên hiển thị `koi`, nếu không có thì hiển thị `batchKoi`
      if (response.data.koi) {
        setSelectedKoiDetail({
          type: "koi",
          data: response.data.koi,
        });
      } else if (response.data.batchKoi) {
        setSelectedKoiDetail({
          type: "batchKoi",
          data: response.data.batchKoi,
        });
      }

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
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `VND${amount}`,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (status) => (
        <span className={`status ${status.toLowerCase()}`}>{status}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => method || "N/A",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => {
        const statusColor = status === "Completed" ? "red" : status === "Pending" ? "green" : "black";
        return <span style={{ color: statusColor,fontWeight: "bold"  }}>{status}</span>;
      },
    },
    {
      title: "Details",
      key: "details",
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
          <Table dataSource={orders} columns={columns} rowKey="orderId" />
        )}

        {/* Order Details Table */}
        {orderDetails.length > 0 && (
          <div ref={orderDetailsRef} className="order-details-container">
            <h3>Order Details</h3>
            <Table
              dataSource={orderDetails}
              rowKey="orderDetailsId"
              columns={[
                {
                  title: "Koi Name",
                  key: "koiName",
                  render: (detail) => detail.koiName || detail.batchKoiName || "N/A",
                },
                {
                  title: "Total Quantity",
                  dataIndex: "toTalQuantity",
                  key: "toTalQuantity",
                },
                {
                  title: "View Detail",
                  key: "viewDetail",
                  render: (_, detail) => (
                    <Button
                      onClick={() =>
                        handleKoiDetailClick(detail.koiId, detail.batchKoiId)
                      }
                    >
                      View Detail
                    </Button>
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
              <h3>{selectedKoiDetail.type === "koi" ? "Koi Details" : "Batch Koi Details"}</h3>
              <div className="image-container">
                <img
                  src={selectedKoiDetail.data.image || "placeholder.jpg"}
                  alt={selectedKoiDetail.data.name || "No Image"}
                  className="koi-image"
                />
              </div>
              <div className="info-container">
                {selectedKoiDetail.type === "koi" ? (
                  <>
                    <div className="info-field"><strong>Name:</strong> {selectedKoiDetail.data.name}</div>
                    <div className="info-field"><strong>Type:</strong> {selectedKoiDetail.data.typeFish || "N/A"}</div>
                    <div className="info-field"><strong>Origin:</strong> {selectedKoiDetail.data.origin}</div>
                    <div className="info-field"><strong>Description:</strong> {selectedKoiDetail.data.description}</div>
                    <div className="info-field"><strong>Gender:</strong> {selectedKoiDetail.data.gender}</div>
                    <div className="info-field"><strong>Age:</strong> {selectedKoiDetail.data.age} years</div>
                    <div className="info-field"><strong>Weight:</strong> {selectedKoiDetail.data.weight} kg</div>
                    <div className="info-field"><strong>Size:</strong> {selectedKoiDetail.data.size} cm</div>
                    <div className="info-field"><strong>Personality:</strong> {selectedKoiDetail.data.personality}</div>
                    <div className="info-field"><strong>Status:</strong> {selectedKoiDetail.data.status}</div>
                    <div className="info-field"><strong>Price:</strong> ${selectedKoiDetail.data.price}</div>
                    <div className="info-field"><strong>Certificate:</strong> {selectedKoiDetail.data.certificate || "N/A"}</div>
                  </>
                ) : (
                  <>
                    <div className="info-field"><strong>Batch Name:</strong> {selectedKoiDetail.data.name}</div>
                    <div className="info-field"><strong>Description:</strong> {selectedKoiDetail.data.description || "N/A"}</div>
                    <div className="info-field"><strong>Quantity:</strong> {selectedKoiDetail.data.quantity}</div>
                    <div className="info-field"><strong>Weight:</strong> {selectedKoiDetail.data.weight} kg</div>
                    <div className="info-field"><strong>Size:</strong> {selectedKoiDetail.data.size} cm</div>
                    <div className="info-field"><strong>Age:</strong> {selectedKoiDetail.data.age} years</div>
                    <div className="info-field"><strong>Origin:</strong> {selectedKoiDetail.data.origin}</div>
                    <div className="info-field"><strong>Gender:</strong> {selectedKoiDetail.data.gender}</div>
                    <div className="info-field"><strong>Status:</strong> {selectedKoiDetail.data.status}</div>
                    <div className="info-field"><strong>Price:</strong> ${selectedKoiDetail.data.price}</div>
                    <div className="info-field"><strong>Certificate:</strong> {selectedKoiDetail.data.certificate || "N/A"}</div>
                    <div className="info-field"><strong>Type Batch:</strong> {selectedKoiDetail.data.typeBatch}</div>
                  </>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default OrderHistoryPage;