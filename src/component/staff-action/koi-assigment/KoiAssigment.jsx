import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import api from "../../../config/axios";
import { motion } from 'framer-motion';
import { Space, Table, Tag ,Button,Modal,Input } from 'antd';
const KoiAssigment = () => {

    const [quotations,setQuotations] = useState([])
    const [isModalVisible, setModalvisible] = useState(false)
    const [selectedRecord,setSelectedRecord] = useState(null)
    const [formData,setFormData] = useState({field1: '', field2 :''});
    const [formReject,setFormReject] = useState({field1: ''});
    const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
    const decisionlist = ["agree","reject"];
    const [totalCount, setTotalCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    //filter and search 
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
    //Fetching data from quotations
        const fetchData = async (pageNumber, pageSize) => {
          try {
            const token = sessionStorage.getItem('token')?.replaceAll('"', '');
            const response = await fetch(`https://localhost:7228/api/quotation/get-quotation?pageNumber=${pageNumber}&pageSize=${pageSize}`, {  
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
            setQuotations(data.items); 
            setTotalCount(data.totalCount); 
            setPageNumber(data.pageNumber); 
            setPageSize(data.pageSize); 
          } catch (err) {
            console.error('API call failed:', err);
          }
        };       
      //

      useEffect(() => {
        fetchData(pageNumber, pageSize);
      }, [pageNumber, pageSize]);
      //
      const handleUpdate =  (record) => {
        //dua record vao state
        setSelectedRecord(record);
        //dua form vao state
        setFormData({field1:record.price, field2:record.note});
        //Hien bang 
        setModalvisible(true);
      };
      //Handle Ok button click
      const handleOk = async () => {
        const {quotationId,requestId } = selectedRecord
        const updatedData = {
          quotationId,
          requestId,
          price: formData.field1,
          note: formData.field2,
          decision:"agree"
        }
        try {     
          const response = await api.post("quotation/updateprice", updatedData);
          if (response.status === 200) {
              console.log('Update successful:', response.data);
          }
      } catch (err) {
          console.log(err);
      }
        setModalvisible(false);
    };
      //từ chối quotation 
      const DecisionRequest = async (value) => {
        if (!selectedRecord) return; 
          const {quotationId, requestId } = selectedRecord
          const rejectQuotation = {
            quotationId,
            requestId,
            price: 0,
            note:formReject.field1,
            decision:value
          }
          try {       
            const response = await api.post("quotation/updateprice", rejectQuotation);
            if (response.status === 200) {
              console.log('Update successful:', response.data);
              fetchData(pageNumber, pageSize);
            }
        } catch (err) {
            console.log(err);
        }
        setModalvisible(false);
      }
  
    //Handle Cancel button click
    const handleCancel = () => {
        setModalvisible(false);
    };


    //modal reject 
    const showModalReject = (record) => { 
        setSelectedRecord(record);
        setFormReject({field1:record.note});
        setIsModalRejectOpen(true);
    };
    const handleOkReject = () => {
        DecisionRequest(decisionlist[1]);
         setIsModalRejectOpen(false); 
    }
    const handleCancelReject = async () =>{
        setIsModalRejectOpen(false);
    }
    //change page 
    const handleChangePage = (page, pageSize) => {
      setPageNumber(page);
      setPageSize(pageSize);
  };

    //Config table 
      const columns = [
        {
            title: 'Quotation ID',
            dataIndex: 'quotationId', 
            key: 'quotationId',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Koi Name',
            dataIndex: 'koiname', 
            key: 'koiname',
            ...getColumnSearchProps('koiname'),
        },
        {
            title: 'Koi Image',
            dataIndex: 'koiImage', 
            key: 'koiImage',
            render: (text) => <img src={text} alt="Koi" style={{ width: '50px' }} />, 
        },
        {
            title: 'Age(years)',
            dataIndex: 'koiAge', 
            key: 'koiAge',
            sorter: (a, b) => a.koiAge - b.koiAge,
        },
        {
            title: 'Size',
            dataIndex: 'koiSize', 
            key: 'koiSize',
            sorter: (a, b) => {
              const sizeA = parseInt(a.koiSize); 
              const sizeB = parseInt(b.koiSize); 
              return sizeA - sizeB; 
          },
        },
        {
            title: 'Weight',
            dataIndex: 'koiWeight', 
            key: 'koiWeight',
            sorter: (a, b) => {
              const sizeA = parseInt(a.koiWeight); 
              const sizeB = parseInt(b.koiWeight); 
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
                  case 'Pending':
                      color = 'gold';
                      break;
                  case 'Confirmed':
                      color = 'green';
                      break;
                  case 'Rejected':
                      color = 'volcano';
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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => {
              const sizeA = parseInt(a.price); 
              const sizeB = parseInt(b.price); 
              return sizeA - sizeB; 
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
                      {status === 'Pending' && (
                        <>
                              <Button color="primary" variant="solid" onClick={() => handleUpdate(record)} >
                                  Agree
                              </Button>
                              <Button color="danger" variant="solid" onClick={() => showModalReject(record)} >
                                  Reject
                              </Button>
                          </>
                      )}
                      {status === 'Confirmed' && (
                          <>
                              <Button color="danger" variant="solid" onClick={() => showModalReject(record)} >
                                  Reject
                              </Button>
                          </>
                      )}
                  </Space>

              );
          },
      },
    ];
    
      const createDataFromQuotations = (quotations) => {
        return quotations.map((quotation) => ({
            key: quotation.quotationId, 
            quotationId: quotation.quotationId, 
            requestId: quotation.requestId,
            koiname: quotation.koiName || 'N/A', 
            koiImage: quotation.koiImage || '', 
            koiAge: quotation.koiAge  || 'N/A', 
            koiSize: quotation.koiSize + " cm" || 'N/A', 
            koiWeight: quotation.koiWeight + " kg" || 'N/A', 
            status: quotation.status || 'N/A', 
            price: quotation.price !=0 ? (quotation.price +".000VND") : (quotation.price), 
            note: quotation.note || 'N/A', 
        }));
    };

    const data = createDataFromQuotations(quotations);
    //
    const tableVariants = {
      hidden: { opacity: 0, y: 20 },  
      visible: { opacity: 1, y: 0 }    
    };
  
  return (
    <div>
        <motion.div
      initial="hidden"
      animate="visible"
      variants={tableVariants}
      transition={{ duration: 0.5 }}  
      >
        <Table columns={columns} dataSource={data}  pagination={{
                    total: totalCount,
                    pageSize: pageSize,
                    current: pageNumber,
                    onChange: handleChangePage,
                }} />
        <Modal
                title="Update Koi Info"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                 <div>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Price</label>
                    <Input
                        placeholder="Price"
                        value={formData.field1}
                        onChange={(e) => setFormData({ ...formData, field1: e.target.value })}
                    />
                </div>
                <div style={{ marginTop: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Note</label>
                    <Input
                        placeholder="Note"
                        value={formData.field2}
                        onChange={(e) => setFormData({ ...formData, field2: e.target.value })}
                    />
                </div>
            </Modal>
            <Modal title="Bạn có muốn từ chối giao dịch này không ?" open={isModalRejectOpen}  onOk={handleOkReject} onCancel={handleCancelReject}>
            <div>
                    <label style={{ display: 'block', marginBottom: '8px' }}>Lý do từ chối</label>
                    <Input
                        placeholder="Note"
                        value={formReject.field1}
                        onChange={(e) => setFormReject({ ...formData, field1: e.target.value })}
                    />
                </div>
          </Modal>
          </motion.div>
    </div>
  )
}

export default KoiAssigment
