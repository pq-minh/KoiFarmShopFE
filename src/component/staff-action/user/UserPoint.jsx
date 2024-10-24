import React, { useState,useEffect,useRef } from 'react';
import api from "../../../config/axios";
import "./index.scss"
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Space, Table, Tag ,Button,Modal,Input } from 'antd';
const UserPoint = () => {
    const [listuser,setListuer] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    //filter 
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
          ...getColumnSearchProps('firstName'),
        },
        {
          title: 'Lastname',
          dataIndex: 'lastName',
          key: 'lastname',
          ...getColumnSearchProps('lastname'),
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
            sorter: (a, b) => {
              const sizeA = parseInt(a.point); 
              const sizeB = parseInt(b.point); 
              return sizeA - sizeB; 
          },
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
              <a>   <button class="Btn-update">Edit 
      <svg class="svg" viewBox="0 0 512 512">
        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
    </button>
 </a>
              <a><Button type="primary" danger>
      Delete
    </Button></a>
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
