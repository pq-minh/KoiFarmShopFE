import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button, Form, Input, Row, Col, Select, Table, Space, Modal } from "antd";
import api from "../../config/axios";
import axios from "axios";

const { Option } = Select;

function Address() {
    const [provine, setProvine] = useState([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);
    const [selectedDistrictId, setSelectedDistrictId] = useState(null);
    const [district, SetDistrict] = useState([]);
    const [ward, SetWard] = useState([]);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState([]);
    const [addressId,setAddressId] = useState(null);
    const [haveAddress, setHaveAddress] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        {
            title: 'Tỉnh/Thành Phố',
            dataIndex: 'address',
            key: 'address',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}>Update</a>
                </Space>
            ),
        },
    ];

    const showAddress = (address) => {
        return address.map((add) => ({
            addressId: add.addressId,
            address: `${add.city}, ${add.dictrict}, ${add.ward}, ${add.streetName}`,
        }));
    };

    const data = showAddress(address);

    useEffect(() => {
        const fetchData = async (url) => {
            try {
                const token = sessionStorage.getItem('token')?.replaceAll('"', '');
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json-patch+json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                if (data && Object.keys(data).length > 0) {
                    setHaveAddress(true);
                    setAddress(data);
                    setAddressId(data.addressId);
                } else {
                    setHaveAddress(false);
                }
            } catch (err) {
                console.error('API call failed:', err);
            }
        };
        fetchData('https://localhost:7228/api/address/getall-address');
    }, []);

    const handleChange = (value) => {
        const selectedProvince = provine.find(province => province.name === value);
        setSelectedProvinceId(selectedProvince ? selectedProvince.id : null);
    };

    const handleChangeDistrict = (value) => {
        const selectedDistrict = district.find(district => district.name === value);
        setSelectedDistrictId(selectedDistrict ? selectedDistrict.id : null);
    };

    const handleConfirmAddress = async (values) => {
        console.log(values);
        try {
            const response = await api.post("address/create-address", values);
            if (response.status === 200) {
                window.location.reload();
                console.log(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            throw err;
        }
    };
//gọi api tỉnh 
    useEffect(() => {
        fetchData('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(receivedData => {
                const newProvinces = receivedData.data.map(province => ({
                    id: province.id,
                    name: province.name
                }));
                setProvine(newProvinces);
            })
            .catch(err => {
                console.error('API call failed:', err);
                setError(err);
            });
    }, []);

    useEffect(() => {
        if (selectedProvinceId) {
            fetchData(`https://esgoo.net/api-tinhthanh/2/${selectedProvinceId}.htm`)
                .then(receivedData => {
                    const newDistrict = receivedData.data.map(district => ({
                        id: district.id,
                        name: district.name
                    }));
                    SetDistrict(newDistrict);
                })
                .catch(err => {
                    console.error('API call failed:', err);
                    setError(err);
                });
        }
    }, [selectedProvinceId]);

    useEffect(() => {
        if (selectedDistrictId) {
            fetchData(`https://esgoo.net/api-tinhthanh/3/${selectedDistrictId}.htm`)
                .then(receivedData => {
                    const newWard = receivedData.data.map(ward => ({
                        id: ward.id,
                        name: ward.name
                    }));
                    SetWard(newWard);
                })
                .catch(err => {
                    console.error('API call failed:', err);
                    setError(err);
                });
        }
    }, [selectedDistrictId]);

 
    const handleEdit = (record) => {
        const { addressId, city, dictrict, ward, streetName } = record;
        const newAddress = { addressId, city, dictrict, ward, streetName };
        setEditingAddress(newAddress);
        setSelectedProvinceId(record.key); 
        setIsModalVisible(true); 
    };
    useEffect(() => {
        console.log("Editing Address:", editingAddress);
    }, [editingAddress]);
    const handleChangeAddress = async (record) => {
        try {
            const response = await api.post('address/updateaddress', {
                id: editingAddress.addressId, 
                city: record.city,
                 district: record.dictrict,
                 ward: record.ward,
                   streetName: record.streetName,
            });
    
            if (response.status == 200) {
                console.log('Address updated successfully:', editingAddress);
                window.location.reload();
                setIsModalVisible(false);
            } else {
                console.error('Failed to update address:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating address:', error);
        } finally{
            setIsModalVisible(false);
        }
    };
    return (
        <div className="address-form">
            {haveAddress ? (
                <div className="address-container">
                    <Table columns={columns} dataSource={data} />
                </div>
            ) : (
                <Form
                    className="address-form"
                    labelCol={{ span: 24 }}
                    onFinish={handleConfirmAddress}
                    initialValues={editingAddress}
                >
                    <div
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                            marginBottom: "1.5rem",
                            color: "#333",
                        }}
                    >
                        Your Shipping Address
                    </div>

                    <Row gutter={20}>
                        <Col span={20}>
                            <Form.Item
                                label="Tỉnh/Thành Phố"
                                name="city"
                                rules={[{ required: true, message: "Please enter your province" }]}
                            >
                                <Select
                                    style={{ width: '100%', fontSize: '16px' }}
                                    placeholder="Chọn Tỉnh/Thành Phố"
                                    onSelect={handleChange}
                                >
                                    {provine.map((item) => (
                                        <Option key={item.id} value={item.name}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={20}>
                            <Form.Item
                                label="Quận/Huyện"
                                name="dictrict"
                                rules={[{ required: true, message: "Please select a district" }]}
                            >
                                <Select
                                    style={{ width: '100%', fontSize: '16px' }}
                                    placeholder="Chọn Quận/Huyện"
                                    onSelect={handleChangeDistrict}
                                >
                                    {district.map((item) => (
                                        <Option key={item.id} value={item.name}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={20}>
                            <Form.Item
                                label="Phường/Xã"
                                name="ward"
                                rules={[{ required: true, message: "Please enter ward" }]}
                            >
                                <Select
                                    style={{ width: '100%', fontSize: '16px' }}
                                    placeholder="Chọn xã"
                                >
                                    {ward.map((item) => (
                                        <Option key={item.id} value={item.name}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={20}>
                            <Form.Item
                                label="Tên Đường"
                                name="streetName"
                                rules={[{ required: true, message: "Please enter street name" }]}
                            >
                                <Input style={{ width: '100%', fontSize: '16px' }} placeholder="Tên Đường" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Confirm Address
                        </Button>
                    </Form.Item>
                </Form>
            )}
            <Modal
                title="Update Address"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    className="address-form"
                    labelCol={{ span: 24 }}
                    onFinish={handleChangeAddress}
                    initialValues={editingAddress}
                >
                    <Row gutter={20}>
                        <Col span={20}>
                            <Form.Item
                                label="Tỉnh/Thành Phố"
                                name="city"
                                rules={[{ required: true, message: "Please enter your province" }]}
                            >
                                <Select
                                    style={{ width: '100%', fontSize: '16px' }}
                                    placeholder="Chọn Tỉnh/Thành Phố"
                                    onSelect={handleChange}
                                >
                                    {provine.map((item) => (
                                        <Option key={item.id} value={item.name}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={20}>
                            <Form.Item
                                label="Quận/Huyện"
                                name="dictrict"
                                rules={[{ required: true, message: "Please select a district" }]}
                            >
                                <Select
                                    style={{ width: '100%', fontSize: '16px' }}
                                    placeholder="Chọn Quận/Huyện"
                                    onSelect={handleChangeDistrict}
                                >
                                    {district.map((item) => (
                                        <Option key={item.id} value={item.name}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={20}>
                            <Form.Item
                                label="Phường/Xã"
                                name="ward"
                                rules={[{ required: true, message: "Please enter ward" }]}
                            >
                                <Select
                                    style={{ width: '100%', fontSize: '16px' }}
                                    placeholder="Chọn xã"
                                >
                                    {ward.map((item) => (
                                        <Option key={item.id} value={item.name}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col span={20}>
                            <Form.Item
                                label="Tên Đường"
                                name="streetName"
                                rules={[{ required: true, message: "Please enter street name" }]}
                            >
                                <Input style={{ width: '100%', fontSize: '16px' }} placeholder="Tên Đường" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Confirm Update
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Address;
