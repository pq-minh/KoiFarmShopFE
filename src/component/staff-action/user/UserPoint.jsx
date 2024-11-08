import React, { useState,useEffect,useRef } from 'react';
import api from "../../../config/axios";
import api2 from "../../../config/axios";
import "./index.scss"
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Space, Table, Tag ,Button,Modal,Input,Form,Select} from 'antd';
import { form } from 'framer-motion/client';
import { motion } from 'framer-motion';

const UserPoint = () => {
    const [listuser,setListuer] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isModalVisible, setModalvisible] = useState(false)
    const [isModalDeleteVisible, setModalDeleteVisible] = useState(false)
    const [isModalUnbanVisible, setModalUnbanVisible] = useState(false)
    const [formData,setFormData] = useState({field1: '', field2 :'',field3:''});
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedrecord,setSelectedRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [visibleColumns, setVisibleColumns] = useState({
      userId: true,
  });
  const [reason,setReason] = useState(null);
    //filter 
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    //
    const tableVariants = {
      hidden: { opacity: 0, y: 20 },  
      visible: { opacity: 1, y: 0 }    
    };
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
            dataIndex: 'userId',
            key: 'userId',
            hidden: !visibleColumns.userId,
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
                case 'Banned':
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
          title: 'Note',
          dataIndex: 'note',
          key: 'note',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => {
            const { status } = record; 

            return (
                <Space size="middle">
                    {status === 'IsActived' && (
                      <>
                      <a>   <button class="Btn-update" onClick={() => handleUpdate(record)}>Edit 
      <svg class="svg" viewBox="0 0 512 512">
        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
    </button>
 </a>
              <a><Button type="primary" danger onClick={() => handleDelete(record)}>
      Ban User
    </Button></a>
                        </>
                    )}
                    {status === 'Banned' && (
                        <>
                            <Button color="primary" variant="solid"  onClick={() => handleUnban(record)}>
                                UnBan
                            </Button>
                        </>
                    )}
                </Space>

            );
        },

             
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
      //handle update user 
      const handleUpdate = (record) =>{
        setSelectedRecord(record);
        console.log(record);
        setModalvisible(true)
        setFormData({field1:record.firstName, field2:record.lastName,field3:record.point});
      }
      //handle ok
      const handleOk = async () => {
        const {id} = selectedrecord
        const updatedData = {
          userId: id,
          firstname: formData.field1,
          lastname: formData.field2,
          point: formData.field3,
        }
        console.log(formData)
        try {     
          const response = await api.post("manageruser/updateuser", updatedData);
          if (response.status === 200) {
              console.log('Update successful:', response.data);
              setListuer((prevlist) => prevlist.map(user => user.id === id ? {...user,firstName:formData.field1,lastname:formData.field2,point:formData.field3} : user))
          }
      } catch (err) {
          console.log(err);
      }
        setModalvisible(false);
    };
      //
      const handleCancel = (record) =>{
        setModalvisible(false)
      }

      //handle Delete user

      const handleDelete = (record) => {
        setSelectedRecord(record)
        setModalDeleteVisible(true);
      }
      //handle unban user 
      const handleUnban = (record) => {    
        setSelectedRecord(record)
        setModalUnbanVisible(true);
      }
      //handle ok user
      const handleDeleteOk = async () => {
        const {id} = selectedrecord;
        try {     
          const response = await api.post("manageruser/deleteuser",{userId:id,reason:reason});
          if (response.status === 200) {
              console.log('Update successful:', response.data);
              setListuer((prevlist) => prevlist.map(user => user.id === id ? {...user,status:'Banned',note:reason} : user))
          }
      } catch (err) {
          console.log(err);
      }
        setModalDeleteVisible(false);
      }
      //handle unban user Ok
      const handleUnbanOk = async () => {
        const {id} = selectedrecord;
        try {     
          const response = await api.post("manageruser/unbanuser",{userId:id});
          if (response.status === 200) {
              console.log('Update successful:', response.data);
              setListuer((prevlist) => prevlist.map(user => user.id === id ? {...user,status:'IsActived',note:""} : user))
          }
      } catch (err) {
          console.log(err);
      }
        setModalUnbanVisible(false);
      }
      //hanlde delete cancer 
      const handleDeleteCancel = (record) => {
        setModalDeleteVisible(false)
      }
      //
      const handleUnbanCancel = (record) => {
        setModalUnbanVisible(false);
      }
      //
      const handleChange = (value) => {
        setReason(value);
      };
  return (
    <motion.div
    initial="hidden"
    animate="visible"
    variants={tableVariants}
    transition={{ duration: 0.5 }}  
  >
    <div className='user-point-cp'>
        <Table columns={columns} dataSource={listuser}  pagination={{
                    total: totalCount,
                    pageSize: pageSize,
                    current: pageNumber,
                    onChange: handleChangePage,
                }} />;
        <Modal
                title="Update User Infor"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                 <div>
                    <label content='First Name' style={{ display: 'block', marginBottom: '8px' }}>First Name</label>
                    <Input
                        placeholder="First Name"
                        value={formData.field1}
                        onChange={(e) => setFormData({ ...formData, field1: e.target.value })}
                    />
                </div>
                <div style={{ marginTop: '16px' }}>
                    <label content='Last Name' style={{ display: 'block', marginBottom: '8px' }}>Last Name</label>
                    <Input
                        placeholder="Last Name"
                        value={formData.field2}
                        onChange={(e) => setFormData({ ...formData, field2: e.target.value })}
                    />
                </div>
                <div style={{ marginTop: '16px' }}>
                    <label content='Point' style={{ display: 'block', marginBottom: '8px' }}>Point</label>
                    <Input
                        placeholder="Point"
                        value={formData.field3}
                        onChange={(e) => setFormData({ ...formData, field3: e.target.value })}
                    />
                </div>
        </Modal>
        <Modal
                title="Do you want to ban this user ?"
                open={isModalDeleteVisible}
                onOk={handleDeleteOk}
                onCancel={handleDeleteCancel}
            >
            <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Select
      defaultValue="None"
      style={{
        width: 320,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'Spam ký gửi cá koi',
          label: 'Spam ký gửi cá koi',
        },
        {
          value: 'Không theo thỏa thuận',
          label: 'Không theo thỏa thuận',
        },
        {
          value: 'Có lời lẽ không đúng chuẩn mực',
          label: 'Có lời lẽ không đúng chuẩn mực',
        },
       
      ]}
    />
          </Form.Item> 
        </Modal>     
        <Modal
                title="Do you want unban this user ?"
                open={isModalUnbanVisible}
                onOk={handleUnbanOk}
                onCancel={handleUnbanCancel}
            >
        </Modal>     
    </div>
    </motion.div>  
  )
}

export default UserPoint
