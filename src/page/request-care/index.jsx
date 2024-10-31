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
    const [submittedOrderIds, setSubmittedOrderIds] = useState([]); // Track submitted order IDs
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
            message.error("Vui lòng chọn ngày kết thúc.");
            return;
        }

        const today = dayjs();
        if (dayjs(endDate).isAfter(today.add(30, "day"))) {
            message.error("Ngày kết thúc không được vượt quá 30 ngày kể từ hôm nay.");
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
            message.success("Yêu cầu chăm sóc đã được gửi thành công");

            setSubmittedOrderIds((prev) => [...prev, order.orderDetailsId]);
            setSelectedOrderId(null);

            setTimeout(() => {
                navigate("/viewrequest");
            }, 1000);

        } catch (error) {
            console.error("Lỗi khi tạo yêu cầu chăm sóc:", error);
        }
    };

    return (
        <div className="request-care">
            <Header setIsLoggedIn={setIsLoggedIn} />
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Yêu cầu chăm sóc</Breadcrumb.Item>
            </Breadcrumb>
            <div className="header-container">
                <h1 className="request-header">
                    Yêu cầu chăm sóc cho cá Koi của bạn
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
                                <h3>{order.koiName || order.batchKoiName || "Không xác định"}</h3>
                                <p><strong>Mã đơn hàng:</strong> {order.orderId}</p>
                                <p><strong>Số lượng:</strong> {order.toTalQuantity}</p>
                                <Button
                                    type="primary"
                                    onClick={() => setSelectedOrderId(order.orderDetailsId)}
                                    style={{ 
                                        marginBottom: 10,
                                        backgroundColor: selectedOrderId === order.orderDetailsId ? "#007bff" : "#1890ff",
                                        borderColor: selectedOrderId === order.orderDetailsId ? "#007bff" : "#1890ff"
                                    }}
                                >
                                    {selectedOrderId === order.orderDetailsId ? "Đã chọn" : "Chọn"}
                                </Button>
                                <div className="date-picker-container">
                                    <DatePicker
                                        onChange={(date) => setEndDates(prev => ({ ...prev, [order.orderDetailsId]: date }))}
                                        disabledDate={(current) => current && (current < dayjs() || current > dayjs().add(30, "day"))}
                                        placeholder="Chọn ngày kết thúc"
                                    />
                                </div>
                                <Button
                                    type="primary"
                                    onClick={() => handleRequestCare(order)}
                                    style={{ marginTop: 10 }}
                                    disabled={selectedOrderId !== order.orderDetailsId}
                                >
                                    Gửi yêu cầu chăm sóc
                                </Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div>
                        <Empty description="Hiện tại không có đơn hàng nào." className="empty-container" />
                        {/* Nút chuyển đến trang xem yêu cầu */}
                        <div className="view-requests-button-container" style={{ marginTop: 20, textAlign: "center" }}>
                            <Button
                                type="primary"
                                onClick={() => navigate("/viewrequest")}
                                style={{
                                    backgroundColor: "#007bff",
                                    borderColor: "#007bff",
                                }}
                            >
                                Xem các yêu cầu đã gửi
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RequestCare;
