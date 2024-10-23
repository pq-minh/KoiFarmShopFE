import React, { useState,useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import api from "../../../config/axios";
const UserPoint = () => {
    const [listuser,setListuer] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    //
    
    

    const handleChangePage = (page, pageSize) => {
        setPageNumber(page);
        setPageSize(pageSize);
    };

    //setup table
    const columns = [
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstname',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Lastname',
          dataIndex: 'lastName',
          key: 'lastname',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
          },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          render: (status) => {
            let color;
            if (!status) return null; 
    
            switch (status) {
                case 'IsActived':
                    color = 'green';
                    break;
                case 'Deleted':
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
              <a>Update </a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];
      //
      useEffect(() => {
        const fetchListUsers = async () => {
          try {
            const response = await api.get(`manageruser?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            if (response.status === 200) {
              setListuer(response.data.items); 
              setTotalCount(response.data.totalCount);
            }
          } catch (err) {
            console.log(err);
          }finally {
            setLoading(false); 
          }
        };
        fetchListUsers();
      }, [pageNumber, pageSize]);
  return (
    <div className='user-point-cp'>
        <Table columns={columns} dataSource={listuser}  pagination={{
                    total: totalCount,
                    pageSize: pageSize,
                    current: pageNumber,
                    onChange: handleChangePage,
                }} />;
    </div>
  )
}

export default UserPoint
