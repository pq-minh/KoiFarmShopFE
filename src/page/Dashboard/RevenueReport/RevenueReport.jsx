import React, { useState, useEffect } from 'react';
import { Table, Tag, notification, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import api from "../../../config/axios"; // Update path as per your file structure

const RevenueReport = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await api.get('/orders/management/get-order-details');
      if (response.status === 200) {
        const data = response.data.map((item) => ({
          key: item.orderDetailsId,
          orderDetailsId: item.orderDetailsId,
          koiName: item.koi ? item.koi.name : item.batchKoi?.name || 'N/A',
          price: item.price,
          customerFunds: item.customerFunds,
          shopRevenue: item.shopRevenue,
        }));
        setReportData(data);
      }
    } catch (error) {
      console.error("Error fetching revenue report:", error);
      notification.error({
        message: 'Failed to Load Report',
        description: 'There was an error fetching the revenue report data.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to add search functionality to each column
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button onClick={() => clearFilters()} size="small" style={{ width: 90, marginTop: 8 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: 'Order Detail ID',
      dataIndex: 'orderDetailsId',
      key: 'orderDetailsId',
      sorter: (a, b) => a.orderDetailsId - b.orderDetailsId,
      ...getColumnSearchProps('orderDetailsId'),
    },
    {
      title: 'Koi / BatchKoi Name',
      dataIndex: 'koiName',
      key: 'koiName',
      ...getColumnSearchProps('koiName'),
    },
    {
      title: 'Price (VND)',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `${price.toLocaleString()} VND`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Customer Funds (VND)',
      dataIndex: 'customerFunds',
      key: 'customerFunds',
      render: (funds) => `${funds.toLocaleString()} VND`,
      sorter: (a, b) => a.customerFunds - b.customerFunds,
    },
    {
      title: 'Shop Revenue (VND)',
      dataIndex: 'shopRevenue',
      key: 'shopRevenue',
      render: (revenue) => `${revenue.toLocaleString()} VND`,
      sorter: (a, b) => a.shopRevenue - b.shopRevenue,
    },
  ];

  return (
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', color: 'red' }}>
        KoiFarmShop's Revenue Report
      </h2>
      <Table
        columns={columns}
        dataSource={reportData}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );  
};

export default RevenueReport;
