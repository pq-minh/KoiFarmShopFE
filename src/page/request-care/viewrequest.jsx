import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { Table, message, Breadcrumb, Spin, Button, Empty } from "antd"; // Importing Empty
import "./viewrequest.scss";
import Header from "../../component/header";

function ViewRequests() {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await api.get("/requestcare/allrequest");
                setRequests(response.data);
            } catch (error) {
                console.error("Error fetching requests:", error);
                message.error("Failed to load request care items");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const columns = [
        {
            title: 'Request ID',
            dataIndex: 'requestId',
            key: 'requestId',
        },
        {
            title: 'Koi Image',
            dataIndex: 'koiImage',
            key: 'koiImage',
            render: (image) => (
                <img src={image || "default_image.jpg"} alt="Koi" style={{ width: 50, height: 50, borderRadius: '5px' }} />
            ),
        },
        {
            title: 'Koi Name',
            dataIndex: 'koiName',
            key: 'koiName',
            render: (text) => text || 'Unknown Koi',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => text || 'Complete',
        },
    ];

    return (
        <div className="view-requests">
            <Header setIsLoggedIn={setIsLoggedIn} />
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item onClick={() => navigate("/requestcare")}>
                    Request Care
                </Breadcrumb.Item>
                <Breadcrumb.Item>All Request Care Items</Breadcrumb.Item>
            </Breadcrumb>
            <div className="header-container">
                <h1 className="requests-header">All Request Care Items</h1>
            </div>
            {isLoading ? (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <Spin size="large" tip="Loading requests..." />
                </div>
            ) : requests.length > 0 ? (
                <Table
                    dataSource={requests}
                    columns={columns}
                    rowKey="requestId"
                    pagination={{ pageSize: 10 }}
                    bordered
                    scroll={{ x: 'max-content' }}
                    className="requests-table"
                />
            ) : (
                <Empty description="No requests have been made yet" />
            )}
            <Button
                type="primary"
                onClick={() => navigate("/requestcare")}
                style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 1000
                }}
            >
                Add Request
            </Button>
        </div>
    );
}

export default ViewRequests;
