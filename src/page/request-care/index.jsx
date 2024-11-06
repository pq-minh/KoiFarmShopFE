import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { Button, Card, DatePicker, message, Breadcrumb, Empty } from "antd";
import dayjs from "dayjs";
import "./index.scss";
import Header from "../../component/header";

function RequestCare() {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [endDates, setEndDates] = useState({});
    const [submittedOrderIds, setSubmittedOrderIds] = useState([]);
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
            message.error("The end date cannot exceed 30 days from today.");
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
            message.success("Care request has been submitted successfully");

            setSubmittedOrderIds((prev) => [...prev, order.orderDetailsId]);
            setSelectedOrderId(null);
            navigate("/viewrequest");       

        } catch (error) {
            console.error("Error creating care request:", error);
        }
    };

    return (
        <div className="request-care">
            <Header setIsLoggedIn={setIsLoggedIn} />
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Care Request</Breadcrumb.Item>
            </Breadcrumb>
            <div className="header-container">
                <h1 className="request-header">
                    Care Request for Your Koi Fish
                </h1>
            </div>

            <div className="order-cards">
                {orders.length > 0 ? (
                    orders.map(order => (
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
                                        backgroundColor: selectedOrderId === order.orderDetailsId ? "#28a745" : "#007bff",
                                        borderColor: selectedOrderId === order.orderDetailsId ? "#28a745" : "#007bff"
                                    }}
                                >
                                    {selectedOrderId === order.orderDetailsId ? "Selected" : "Select"}
                                </Button>
                                <div className="date-picker-container">
                                    <DatePicker
                                        onChange={(date) => setEndDates(prev => ({ ...prev, [order.orderDetailsId]: date }))}
                                        disabledDate={(current) => current && (current < dayjs() || current > dayjs().add(30, "day"))}
                                        placeholder="Select end date"
                                    />
                                </div>
                                <Button
                                    type="primary"
                                    onClick={() => handleRequestCare(order)}
                                    style={{ marginTop: 10 }}
                                    disabled={selectedOrderId !== order.orderDetailsId}
                                >
                                    Submit Care Request
                                </Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Empty description="No orders available." className="empty-container" />
                )}
            </div>

            <div className="view-requests-button-container" style={{ marginTop: 20, textAlign: "center" }}>
                <Button
                    type="primary"
                    onClick={() => navigate("/viewrequest")}
                    style={{
                        backgroundColor: "#007bff",
                        borderColor: "#007bff",
                    }}
                >
                    View Submitted Requests
                </Button>
            </div>
        </div>
    );
}

export default RequestCare;
