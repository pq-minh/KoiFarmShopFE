import React, { useState, useEffect, useRef } from 'react';
import api from "../../../config/axios";
import "./index.scss";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Space, Table, Tag, Button, Modal, notification, Input } from 'antd';

const PaymentManagement = () => {
    const [paymentList, setPaymentList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
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

    const formatCurrency = (amount) => {
        return `${amount.toLocaleString()} VND`; // Format currency as VND
    };

    const updatePaymentStatus = async (paymentId, paymentStatus) => {
        try {
            const response = await api.put(
                '/orders/management/update-payment/status',{paymentId , paymentStatus}
            );
            console.log(response);
            if (response.status === 200) {
                notification.success({
                    message: 'Payment status updated successfully!',
                });
                fetchPayments(); // Refresh the payment list
            } else {
                notification.error({
                    message: 'Failed to update payment status',
                });
            }
        } catch (err) {
            console.error(err); // Log thêm lỗi
            notification.error({
                message: 'Error updating payment status',
                description: err.response ? err.response.data.message : 'Unknown error',
            });
        }
    };
    

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderID',
            key: 'orderID',
            ...getColumnSearchProps('orderID'),
        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            ...getColumnSearchProps('paymentMethod'),
        },
        {
            title: 'Create Date',
            dataIndex: 'createDate',
            key: 'createDate',
            render: (text) => new Date(text).toLocaleDateString(), // Format date
            ...getColumnSearchProps('createDate'),
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text) => formatCurrency(text), // Format amount as VND
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Completed', value: 'Completed' },
                { text: 'Pending', value: 'Pending' },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (text) => {
                let color = text === 'Completed' ? 'green' : 'orange';
                return <Tag color={color}>{text}</Tag>; // Status with color
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                const isCompleted = record.status === 'Completed';
                return (
                    !isCompleted && (
                        <Button
                            type="primary"
                            onClick={() => updatePaymentStatus(record.paymentID, 'Completed')}
                        >
                            Mark as Completed
                        </Button>
                    )
                );
            },
        },
    ];
    

    const handleChangePage = (page, pageSize) => {
        setPageNumber(page);
        setPageSize(pageSize);
    };

    const fetchPayments = async () => {
        try {
            const response = await api.get(`/orders/management/get-payments?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            if (response.status === 200) {
                const updatedPaymentList = response.data.map(item => ({
                    ...item,
                    key: item.paymentID // Use paymentID as the key
                }));
                setPaymentList(updatedPaymentList);
                setTotalCount(response.data.length);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, [pageNumber, pageSize]);

    return (
        <div className='payment-management'>
            <Table
                columns={columns}
                dataSource={paymentList}
                pagination={{
                    total: totalCount,
                    pageSize: pageSize,
                    current: pageNumber,
                    onChange: handleChangePage,
                }}
                loading={loading}
            />
        </div>
    );
};

export default PaymentManagement;
