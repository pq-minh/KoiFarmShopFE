import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { Button, Card, DatePicker, message, Breadcrumb } from "antd";
import dayjs from "dayjs";
import "./index.scss";
import Header from "../../component/header";

function RequestCare() {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [endDates, setEndDates] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/requestcare/allorderdetail")
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => console.error("Error fetching orders:", error));
    }, []);

    const handleRequestCare = async (order) => {
        const endDate = endDates[order.orderDetailsId];
        if (!endDate) {
            message.error("Please select an end date.");
            return;
        }

        const today = dayjs();
        if (dayjs(endDate).isAfter(today.add(30, "day"))) {
            message.error("End date cannot exceed 30 days from today.");
            return;
        }

        const requestPayload = {
            orderDetails: [
                {
                    koiId: order.koiId,
                    batchKoiId: order.batchKoiId,
                    toTalQuantity: order.toTalQuantity,
                }
            ],
            endDate,
        };

        try {
            await api.post("/requestcare", requestPayload);
            message.success("Request care successfully submitted");
            setEndDates(prev => ({ ...prev, [order.orderDetailsId]: null }));
            navigate("/viewrequest"); // Redirect to the page showing all created request care
        } catch (error) {
            console.error("Error creating request care:", error);
        }
    };

    return (
        <div className="request-care">
            <Header setIsLoggedIn={setIsLoggedIn} />
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item onClick={() => navigate("/requestcare")}>
                    Request Care
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => navigate("/viewrequest")}>
                    View Requests
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="header-container">
                <h1 className="request-header">
                    Request Care for Your Koi
                </h1>
            </div>
            <div className="order-cards">
                {orders.map(order => (
                    <Card key={order.orderDetailsId} className="order-card">
                        <img
                            alt={order.koiName || order.batchKoiName}
                            src={order.koiImage || order.batchKoiImage}
                        />
                        <div className="details">
                            <h3>{order.koiName || order.batchKoiName || "Unknown"}</h3>
                            <p><strong>Order ID:</strong> {order.orderId}</p>
                            <p><strong>Quantity:</strong> {order.toTalQuantity}</p>
                            <Button
                                type="primary"
                                onClick={() => setSelectedOrderId(order.orderDetailsId)}
                                style={{ 
                                    marginBottom: 10,
                                    backgroundColor: selectedOrderId === order.orderDetailsId ? "#007bff" : "#1890ff",
                                    borderColor: selectedOrderId === order.orderDetailsId ? "#007bff" : "#1890ff"
                                }}
                            >
                                {selectedOrderId === order.orderDetailsId ? "Selected" : "Select"}
                            </Button>
                            <div className="date-picker-container">
                                <DatePicker
                                    onChange={(date) => setEndDates(prev => ({ ...prev, [order.orderDetailsId]: date }))}
                                    disabledDate={(current) => current && (current < dayjs() || current > dayjs().add(30, "day"))}
                                />
                            </div>
                            <Button
                                type="primary"
                                onClick={() => handleRequestCare(order)}
                                style={{ marginTop: 10 }}
                                disabled={selectedOrderId !== order.orderDetailsId}
                            >
                                Submit Request Care
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default RequestCare;
