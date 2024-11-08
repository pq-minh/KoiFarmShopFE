import React, { useState, useEffect, useRef } from 'react';
import api from "../../../config/axios";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Space, Table, Button, Select, Input, Modal, message } from 'antd';

const UpdateRole = () => {
    const [listuser, setListUser] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUserEmail, setEditingUserEmail] = useState(null);
    const [newRole, setNewRole] = useState(null);

    const roles = [
        { value: 'Staff', roleId: '17a0249c-e064-49aa-afc8-53e64a5d704a' },
        { value: 'Admin', roleId: '0d49bfcc-c6fc-4be1-b277-ff197038c574' },
        { value: 'Customer', roleId: '5980ce6a-5e42-4ffa-b862-e16d4f9b445b' }
    ];

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
                    <Button
                        type="link"
                        size="small"
                        onClick={() => close()}
                    >
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
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleChangePage = (page, pageSize) => {
        setPageNumber(page);
        setPageSize(pageSize);
    };

    const handleOpenModal = (email, currentRole) => {
        setEditingUserEmail(email);
        setNewRole(currentRole);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setEditingUserEmail(null);
        setNewRole(null);
    };

    const handleUpdateRole = async () => {
        try {
            const updatedData = {
                email: editingUserEmail,
                roleName: newRole,
            };
            const response = await api.post("admin/updaterole", updatedData);
            if (response.status === 200) {
                setListUser((prevList) => prevList.map(user => 
                    user.email === editingUserEmail ? { ...user, role: newRole } : user
                ));
                message.success(`Successfully updated role to ${newRole}`);
                handleCloseModal();
            }
        } catch (err) {
            message.error("Failed to update role. Please try again.");
            console.log(err);
        }
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            ...getColumnSearchProps('firstName'),
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            ...getColumnSearchProps('lastName'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <span
                    style={{
                        color: role === 'Customer' ? 'green' : role === 'Staff' ? 'red' : 'black',
                        border: `1px solid ${
                            role === 'Customer' ? 'rgba(0, 128, 0, 0.3)' : role === 'Staff' ? 'rgba(255, 0, 0, 0.3)' : 'transparent'
                        }`,
                        borderRadius: '4px',
                        padding: '2px 6px',
                        display: 'inline-block'
                    }}
                >
                    {role}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {(record.role === 'Customer' || record.role === 'Staff') && (
                        <Button type="primary" onClick={() => handleOpenModal(record.email, record.role)}>
                            Update Role
                        </Button>
                    )}
                </Space>
            ),
        }
        
    ];

    useEffect(() => {
        const fetchListUsers = async () => {
            setLoading(true);
            try {
                const response = await api.get(`manageruser/userwithrole?pageNumber=${pageNumber}&pageSize=${pageSize}`);
                if (response.status === 200) {
                    setListUser(response.data.items.map(user => ({ ...user, role: user.roles[0] })));
                    setTotalCount(response.data.totalCount);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchListUsers();
    }, [pageNumber, pageSize]);

    return (
        <div className='update-role-cp'>
            <Table
                columns={columns}
                dataSource={listuser.map(user => ({ ...user, key: user.id }))}
                pagination={{
                    total: totalCount,
                    pageSize: pageSize,
                    current: pageNumber,
                    onChange: handleChangePage,
                }}
                loading={loading}
            />

            {/* Modal for role update */}
            <Modal
                title="Update User Role"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="back" onClick={handleCloseModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleUpdateRole}>
                        Update
                    </Button>,
                ]}
            >
                <Select
                    defaultValue={newRole}
                    onChange={setNewRole}
                    options={roles.filter(role => role.value !== 'Admin').map(role => ({
                        label: role.value,
                        value: role.value,
                    }))}
                    style={{ width: '100%' }}
                />
            </Modal>
        </div>
    );
};

export default UpdateRole;
