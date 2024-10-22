import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Modal, Form, Input, Button } from 'antd';
import api from '../../../config/axios';
import api2 from '../../../config/axios';
import './index.scss'
const Discount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  //format ngày và giờ 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }) + ' ' + date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  // setup table 
  const columns = [
    {
      title: 'Discount ID',
      dataIndex: 'discountId',
      key: 'discountId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Discount Rate',
      dataIndex: 'discountRate',
      key: 'discountrate',
    },
    {
      title: 'Total Quantity',
      dataIndex: 'totalQuantity',
      key: 'totalquantity',
    },
    {
      title: 'Used',
      dataIndex: 'used',
      key: 'used',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startdate',
      render: (text) => formatDate(text),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate', 
      key: 'enddate',
      render: (text) => formatDate(text),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        if (!status) return null; 
        let color;
        switch (status) {
          case 'Active':
            color = 'green';
            break;
          case 'Inactive':
            color = 'red';
            break;
          default:
            color = 'blue';
        }

        return (
          <Tag color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><button className='update-btn'> Update</button></a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await api.get("discounts");
        if (response.status === 200) {
          setDiscounts(response.data); 
        }
      } catch (err) {
        console.log(err);
      }finally {
        setLoading(false); 
      }
    };

    fetchDiscounts();
  }, []);
  //handle create new discout 
  const handleCreate = async (values) => {
    try {
      const response = await api2.post("discounts/create-discount", values);
      if (response.status === 200) {
        setDiscounts([...discounts, response.data]); 
        form.resetFields(); 
        setIsModalVisible(false); 
      }
    } catch (error) {
      console.error("Error creating discount:", error);
    }
  };
  return (
    <div>
    <div className='create-button'>
    <button class="button" onClick={() => setIsModalVisible(true)}>
    Create New
  </button>
    </div>
      <div className='discount-table'>
        <Table columns={columns} dataSource={discounts} rowKey="discountId" />
      </div>

      <Modal
        title="Create New Discount"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreate}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="discountRate"
            label="Discount Rate"
            rules={[{ required: true, message: 'Please input the discount rate!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="totalQuantity"
            label="Total Quantity"
            rules={[{ required: true, message: 'Please input the total quantity!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select the start date!' }]}
          >
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select the end date!' }]}
          >
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default Discount;
