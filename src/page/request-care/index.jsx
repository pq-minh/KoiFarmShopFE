import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Button, Card, DatePicker, message } from "antd";
import dayjs from "dayjs";
import "./index.scss";
import Header from "../../component/header";

function RequestCare() {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null); // Thay đổi từ selectedOrder sang selectedOrderId
    const [endDates, setEndDates] = useState({});

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

        api.post("/requestcare", requestPayload)
            .then(() => {
                message.success("Request care successfully submitted");
                setEndDates(prev => ({ ...prev, [order.orderDetailsId]: null }));
            })
            .catch(error => console.error("Error creating request care:", error));
    };

    return (
        <div>
            <Header />
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
                                onClick={() => setSelectedOrderId(order.orderDetailsId)} // Cập nhật state selectedOrderId
                                style={{ 
                                    marginBottom: 10,
                                    backgroundColor: selectedOrderId === order.orderDetailsId ? "#007bff" : "#1890ff", // Thay đổi màu nền
                                    borderColor: selectedOrderId === order.orderDetailsId ? "#007bff" : "#1890ff" // Thay đổi màu viền
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
