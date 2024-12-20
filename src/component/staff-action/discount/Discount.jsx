import React, { useEffect, useState,useRef } from 'react';
import { Space, Table, Tag, Modal, Form, Input, Button } from 'antd';
import api from '../../../config/axios';
import api2 from '../../../config/axios';
import { SearchOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { message } from 'antd';

import Highlighter from 'react-highlight-words';
import './index.scss'
const Discount = () => {
  const [discounts, setDiscounts] = useState([]);
  const [discountCode,setDiscountCode] = useState([])
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord,setSelectedRecord] = useState(null)
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false)
  const [form] = Form.useForm();
  //antd search and filter 
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [errorMessage, setErrorMessage] = useState([])
  const searchInput = useRef(null);
  //
  const tableVariants = {
    hidden: { opacity: 0, y: 20 },  
    visible: { opacity: 1, y: 0 }    
  };

  //  
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
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
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
      title: 'Code',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Discount Rate(%)',
      dataIndex: 'discountRate',
      key: 'discountrate',
      sorter: (a, b) => a.discountRate - b.discountRate,
    },
    {
      title: 'Total Quantity',
      dataIndex: 'totalQuantity',
      key: 'totalquantity',
      sorter: (a, b) => a.totalQuantity - b.totalQuantity,
    },
    {
      title: 'Used',
      dataIndex: 'used',
      key: 'used',
      sorter: (a, b) => a.used- b.used,
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
          case 'InActive':
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
          <a><button className='update-btn' onClick={() => handleUpdateClick(record)}> Update</button></a>
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
          const codes = response.data.map(discount => discount.name);
          setDiscountCode(codes);
        }
      } catch (err) {
        console.log(err);
      }finally {
        setLoading(false); 
      }
    };

    fetchDiscounts();
  }, []);
  //handleupdate click

  const handleUpdateClick = (record) => {
    setSelectedRecord(record);
    setIsModalUpdateVisible({
        isVisible:true,
    })
    const formattedStartDate = new Date(record.startDate).toISOString().slice(0, 16);
    const formattedEndDate = new Date(record.endDate).toISOString().slice(0, 16);
    form.setFieldsValue({
      discountRate: record.discountRate,
      totalQuantity: record.totalQuantity,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  }

  //handle create new discout 
  const handleCreate = async (values) => {
    try {
      const response = await api2.post("discounts/creatediscount", {
        name:values.name,
        description:values.description,
        discountRate:values.discountRateCreate,
        totalQuantity:values.totalQuantityCreate,
        startDate:values.startDateCreate,
        endDate:values.endDateCreate
      });
      if (response.status === 200) {
        setDiscounts([...discounts, response.data]); 
        form.resetFields(); 
        setIsModalVisible(false); 
      } 
    } catch (err) {
      if (err.response && err.response.data) {
        let messages = [];
        messages = [
          ...(err.response.data.errors.StartDate || []),
          ...(err.response.data.errors.TotalQuantity || []),
          ...(err.response.data.errors.DiscountRate || []),
        ];
        Modal.error({
          width: 600,
            title: "Error create discount",
            content: (
                <div>
                   {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))
           ) : (
             <div>An unexpected error occurred. Please try again.</div>
           )}
                </div>
            ),
        });
    } else {
        Modal.error({
            content: "An unexpected error occurred. Please try again.",
        });
    }
    }
  };
  //handle check discount code
  const handleCheckDiscountCode = (value) => {
    const isValid = discountCode.some((discount) => discount === value);

    if (!isValid) {
      message.success('Discount code is valid!');
    } else {
      message.error('Discount code is duplicated!');
    }
  };
  //handle update discount
  const handleUpdate = async (values) => {
    try{
        const response = await api2.post("discounts/updatediscount",{
          ...values,
          discountId: selectedRecord.discountId,
        });
        if (response.status == 200){
          Modal.success({
            title: "Discount updated",
            content: "Discount updated successfully "
          })
          setDiscounts(discounts.map(discount => 
            discount.discountId === selectedRecord.discountId 
              ? { ...discount, ...values, status: response.data.status } 
              : discount
          ));
        form.resetFields(); 
        setIsModalUpdateVisible(false); 
        }
    } catch (e){
      console.error(e)
    }
  }
  return (
    <div>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={tableVariants}
      transition={{ duration: 0.5 }}  
      >
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
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreate}>
          <Form.Item
            name="name"
            label="Code"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input  onBlur={(e) => handleCheckDiscountCode(e.target.value)}  />
           
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="discountRateCreate"
            label="Discount Rate"
            rules={[{ required: true, message: 'Please input the discount rate!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="totalQuantityCreate"
            label="Total Quantity"
            rules={[{ required: true, message: 'Please input the total quantity!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="startDateCreate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select the start date!' }]}
          >
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item
            name="endDateCreate"
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
      <Modal 
       title="Update Discount"
        open={isModalUpdateVisible}
        onCancel={() => setIsModalUpdateVisible(false)}
        footer={null}
        >
         <Form form={form} onFinish={handleUpdate} initialValues={setIsModalUpdateVisible.record}>
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
              Update
          </Button>
          </Form.Item>
        </Form>
      </Modal>
      </motion.div>
    </div>
  );
};

export default Discount;
