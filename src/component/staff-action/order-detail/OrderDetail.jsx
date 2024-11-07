import React, { useState, useEffect, useRef } from 'react';
import api from "../../../config/axios";
import "./index.scss";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Space, Table, Tag, Button, Modal, Select, notification, Input } from 'antd';

const { Option } = Select;

const OrderManagement = () => {
    const [orderList, setOrderList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [confirmRefuse, setConfirmRefuse] = useState(false); 
    const [formData, setFormData] = useState({ orderDetailId: '', status: '' });
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button type="link" size="small" onClick={() => close()}>
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Order Detail ID',
            dataIndex: 'orderDetailsId', 
            key: 'orderDetailsId',
            ...getColumnSearchProps('orderDetailsId'),
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            ...getColumnSearchProps('userName'),
        },
        {
            title: 'Koi Name',
            dataIndex: 'koiName',
            key: 'koiName',
            render: (koiName, record) => koiName || record.batchKoiName, // Hiển thị koiName hoặc batchKoiName nếu không có koiName
            ...getColumnSearchProps('koiName'),
        },
        {
            title: 'Total Quantity',
            dataIndex: 'toTalQuantity', // Chú ý chính tả trong API response
            key: 'toTalQuantity',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Pending', value: 'Pending' },
                { text: 'Delivered', value: 'Delivered' },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (text) => {
                let color;
                if (text === 'Pending') {
                    color = 'orange';
                } else if (text === 'Delivered') {
                    color = 'green';
                }
                return <Tag color={color}>{text}</Tag>; // Use Tag to display status with color
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleUpdate(record)}>Update Status</Button>
                </Space>
            ),
        },
    ];

    const handleChangePage = (page, pageSize) => {
        setPageNumber(page);
        setPageSize(pageSize);
    };

    const fetchOrders = async () => {
        try {
            const response = await api.get(`/orders/orderdetail/staff?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            if (response.status === 200) {
                const updatedOrderList = response.data.map(item => ({
                    ...item,
                    key: item.orderDetailsId // Thay đổi để sử dụng orderDetailsId
                }));
                setOrderList(updatedOrderList);
                setTotalCount(response.data.length);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [pageNumber, pageSize]);

    const handleUpdate = (record) => {
        setFormData({ orderDetailId: record.orderDetailsId, status: record.status }); // Cập nhật để sử dụng orderDetailsId
        setModalVisible(true);
    };

    const handleOk = () => {
        if (formData.status === 'Delivered') {
            setConfirmRefuse(true); // Hiển thị modal xác nhận
        } else {
            updateStatus();
        }
    };

    const handleConfirmRefuse = async () => {
        setConfirmRefuse(false);
        await updateStatus();
    };

    const updateStatus = async () => {
        try {
            const response = await api.post("/orders/orderdetail/staff/modify", {
                orderDetailId: formData.orderDetailId,
                status: formData.status
            });

            if (response.status === 204) {
                setOrderList((prevList) =>
                    prevList.map((order) =>
                        order.orderDetailsId === formData.orderDetailId ? { ...order, status: formData.status } : order
                    )
                );

                notification.success({
                    message: 'Status Updated',
                    description: `The status has been updated to ${formData.status}.`,
                });
            } else {
                notification.error({
                    message: 'Update Failed',
                    description: 'The status update was not successful.',
                });
            }
        } catch (err) {
            console.error(err);
            notification.error({
                message: 'Update Failed',
                description: 'There was an error updating the status. Please try again.',
            });
        }
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <div className='order-management'>
            <Table
                columns={columns}
                dataSource={orderList}
                pagination={{
                    total: totalCount,
                    pageSize: pageSize,
                    current: pageNumber,
                    onChange: handleChangePage,
                }}
                loading={loading}
            />
            <Modal
                title="Update Order Status"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>
                    <label>Status</label>
                    <Select
                        placeholder="Select a new status"
                        value={formData.status}
                        onChange={(value) => setFormData({ ...formData, status: value })}
                        style={{ width: '100%' }}
                    >
                        <Option value="Pending">Pending</Option>
                        <Option value="Delivered">Delivered</Option>                        
                    </Select>
                </div>
            </Modal>
            <Modal
                title="Confirm Refusal"
                open={confirmRefuse}
                onOk={handleConfirmRefuse}
                onCancel={() => setConfirmRefuse(false)}
            >
                <p>Are you sure you want to update this order?</p>
            </Modal>
        </div>
    );
};

export default OrderManagement;
