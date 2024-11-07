import React, { useState, useEffect, useRef } from 'react';
import api from "../../../config/axios";
import "./index.scss";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Space, Table, Tag, Button, Modal, Select, notification, Input } from 'antd';

const { Option } = Select;

const RequestCare = () => {
    const [requestList, setRequestList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [confirmRefuse, setConfirmRefuse] = useState(false);
    const [formData, setFormData] = useState({ requestId: '', status: '' });
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
            title: 'Request ID',
            dataIndex: 'requestId',
            key: 'requestId',
            sorter: (a, b) => a.requestId - b.requestId, // Sort by requestId in ascending order
            defaultSortOrder: 'ascend', // Set default sorting order
        },
        {
            title: 'Koi Name',
            dataIndex: 'koiName',
            key: 'koiName',
            render: (_, record) => {
                return record.isBatchKoi ? record.batchKoiName : record.koiName;
            },
            ...getColumnSearchProps('koiName'),
        },
        {
            title: 'Image',
            dataIndex: 'koiImage',
            key: 'koiImage',
            render: (text) => <img src={text} alt="Koi" style={{ width: 50, height: 50 }} />,
        },
        {
            title: 'Start Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status) => {
                let color;
                if (!status) return null;

                switch (status) {
                    case 'UnderCare':
                        color = 'green';
                        break;
                    case 'CompletedCare':
                        color = 'blue';
                        break;
                    case 'RefusedCare':
                        color = 'red';
                        break;
                    default:
                        color = 'blue';
                }
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {record.status !== 'CompletedCare' &&  record.status !== 'RefusedCare' && (
                        <Button onClick={() => handleUpdate(record)}>Update Status</Button>
                    )}
                </Space>
            ),
        },
    ];

    const handleChangePage = (page, pageSize) => {
        setPageNumber(page);
        setPageSize(pageSize);
    };

    const fetchRequests = async () => {
        try {
            const response = await api.get(`requestcare/allrequest?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            if (response.status === 200) {
                const updatedRequestList = response.data.map(item => ({
                    ...item,
                    key: item.requestId, // Assuming requestId is unique
                    isBatchKoi: !!item.batchKoiName // Distinguishes between koi and batchKoi
                }));
    
                // Sort the request list by requestId ascending
                updatedRequestList.sort((a, b) => a.requestId - b.requestId);
    
                setRequestList(updatedRequestList);
                setTotalCount(response.data.length);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchRequests();
    }, [pageNumber, pageSize]);

    const handleUpdate = (record) => {
        setFormData({ requestId: record.requestId, status: record.status });
        setModalVisible(true);
    };

    const handleOk = () => {
        if (formData.status === 'RefusedCare') {
            setConfirmRefuse(true); // Show confirmation modal
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
            const statusMapping = {
                'UnderCare': 1,
                'CompletedCare': 2,
                'RefusedCare': 3,
            };

            const response = await api.patch("requestcare/request", {
                id: formData.requestId,
                status: statusMapping[formData.status]
            });

            if (response.status === 204) {
                setRequestList((prevList) =>
                    prevList.map((req) =>
                        req.requestId === formData.requestId ? { ...req, status: formData.status } : req
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
        <div className='request-care'>
            <Table
                columns={columns}
                dataSource={requestList}
                pagination={{
                    total: totalCount,
                    pageSize: pageSize,
                    current: pageNumber,
                    onChange: handleChangePage,
                }}
                loading={loading}
            />
            <Modal
                title="Update Request Status"
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
                        <Option value="UnderCare">UnderCare</Option>
                        <Option value="CompletedCare">CompletedCare</Option>
                        <Option value="RefusedCare">RefusedCare</Option>
                    </Select>
                </div>
            </Modal>
            <Modal
                title="Confirm Refusal"
                open={confirmRefuse}
                onOk={handleConfirmRefuse}
                onCancel={() => setConfirmRefuse(false)}
            >
                <p>Are you sure you want to refuse this request?</p>
            </Modal>
        </div>
    );
};

export default RequestCare;
