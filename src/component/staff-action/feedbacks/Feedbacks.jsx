import React, { useState, useEffect } from 'react';
import api from "../../../config/axios";
import "./index.scss";
import { Table, Rate, notification, Image, Button, Modal } from 'antd';

const FeedbackManagement = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Image',
            dataIndex: 'koiImage',
            key: 'koiImage',
            render: (text, record) => (
                <Image
                    width={100}
                    src={record.koiImage || record.batchKoiImage}
                    alt="Koi or Batch Koi"
                />
            ),
        },
        {
            title: 'Koi Name / Batch Koi Name',
            dataIndex: 'koiName',
            key: 'koiName',
            render: (text, record) => record.koiName || record.batchKoiName,
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => (
                <Rate disabled value={rating} />
            ),
        },
        {
            title: 'Comments',
            dataIndex: 'comments',
            key: 'comments',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                // Normalize the status value to lowercase to avoid case sensitivity issues
                const normalizedStatus = status?.toLowerCase();
        
                return (
                    <span 
                        style={{ 
                            color: normalizedStatus === 'removed' ? 'red' : normalizedStatus === 'posted' ? 'green' : 'black', 
                            fontWeight: 'bold' // Optional: make the status text bold for better visibility
                        }}
                    >
                        {status}
                    </span>
                );
            }
        },        
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                record.status !== 'Removed' && (
                    <Button 
                        type="danger" 
                        style={{ borderRadius: '5px', padding: '5px 10px' }} 
                        onClick={() => showDeleteConfirm(record.reviewId)}
                    >
                        Delete
                    </Button>
                )
            ),
        },
    ];

    const fetchFeedback = async () => {
        try {
            const response = await api.get(`/reviews/staff?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            if (response.status === 200) {
                const updatedFeedbackList = response.data.map(item => ({
                    ...item,
                    key: item.reviewId,
                }));
                setFeedbackList(updatedFeedbackList);
                setTotalCount(response.data.length);
            }
        } catch (err) {
            console.error(err);
            notification.error({
                message: 'Failed to Fetch Feedback',
                description: 'An error occurred while fetching feedback data.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await api.delete('/reviews', {
                data: { id: selectedFeedbackId },
            });
            if (response.status === 204) {
                notification.success({
                    message: 'Feedback Deleted',
                    description: 'The feedback has been deleted successfully.',
                });
                setIsModalVisible(false); // Close the modal
                fetchFeedback(); // Reload feedback data to get updated statuses
            }
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Failed to Delete Feedback',
                description: 'An error occurred while deleting the feedback. Please try again.',
            });
        }
    };
    

    const showDeleteConfirm = (id) => {
        setSelectedFeedbackId(id);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChangePage = (page, pageSize) => {
        setPageNumber(page);
        setPageSize(pageSize);
    };

    useEffect(() => {
        fetchFeedback();
    }, [pageNumber, pageSize]);

    return (
        <div className='feedback-management'>
            <Table
                columns={columns}
                dataSource={feedbackList}
                pagination={{
                    total: totalCount,
                    pageSize: pageSize,
                    current: pageNumber,
                    onChange: handleChangePage,
                }}
                loading={loading}
            />

            {/* Modal Confirmation for Delete */}
            <Modal
                title="Confirm Deletion"
                visible={isModalVisible}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText="Yes, Delete"
                cancelText="No, Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this feedback?</p>
            </Modal>
        </div>
    );
};

export default FeedbackManagement;
