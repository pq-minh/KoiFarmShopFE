import React, { useState ,useEffect } from 'react'
import { Space, Table, Tag } from 'antd';
import { Button, ConfigProvider, Flex,Modal } from 'antd';
import api from "../../../config/axios";


const TableAssigment = () => {
    const [requests,setRequests] = useState([])
    const [selectedRecord,setSelectedRecord] = useState(null);
    const [selectedRecordReject,setSelectedRecordReject] = useState(null);
    const [isModalRequestDecisionOpen, setIsModalRequestDecisonOpen] = useState(false);
    const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
    const decisionlist = ["agree","reject"];
    const [totalCount, setTotalCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    //

    const DecisionRequest = async (value) => {
      if (!selectedRecord) return; 
        const {requestid } = selectedRecord
        const updateStatusRequestAndKoiStatus = {
          requestid,
          decision:value,
        }
        console.log(updateStatusRequestAndKoiStatus)
        try {       
          const response = await api.post("request/decision-request", updateStatusRequestAndKoiStatus);
          if (response.status === 200) {
            const updatedRequests = requests.map((request) =>
              request.requestId === requestid
                  ? { ...request, status: value === "agree" ? "Completed" : "Rejected" }
                  : request
            );
           setRequests(updatedRequests);
           
          }
      } catch (err) {
          console.log(err);
      }
    }

    //fetching data reuquest
        const fetchData = async (pageNumber, pageSize) => {
          try {
            const token = sessionStorage.getItem('token')?.replaceAll('"', '');
            const response = await fetch(`https://localhost:7228/api/request/get-request?pageNumber=${pageNumber}&pageSize=${pageSize}`, {  
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
             setRequests(data.items);
             setTotalCount(data.totalCount); 
            setPageNumber(data.pageNumber); 
            setPageSize(data.pageSize); 
          } catch (err) {
            console.error('API call failed:', err);
          }
        };       

        useEffect(() => {
          fetchData(pageNumber, pageSize)
        },[pageNumber, pageSize])
        //xử lý change page 
        const handleChangePage = (page, pageSize) => {
          setPageNumber(page);
          setPageSize(pageSize);
        };

      //Modal antd 


      //Update request after click OK show modal of request decision
      const showModalDecisionRequest = (record) => {
        setSelectedRecord(record);
        setIsModalRequestDecisonOpen(true);
      };
    
      const handleOkRequestDecision = async () => {
        DecisionRequest(decisionlist[0]);
        setIsModalRequestDecisonOpen(false);
      };
      
      const handleCancelRequestDecision = () => {
        setIsModalRequestDecisonOpen(false);
      };


      //Open modal reject
      const showModalReject = (record) => {
        setSelectedRecord(record);
          setIsModalRejectOpen(true);
      };
      const handleOkReject = () => {
          DecisionRequest(decisionlist[1]);
           setIsModalRejectOpen(false); 
      }
      const handleCancelReject = async () =>{
          setIsModalRejectOpen(false);
      }

      //setup table 
      const columns = [
        {
            title: 'Request Id',
            dataIndex: 'requestid',
            key: 'requestid',
            render: (text) => <a>{text}</a>,
          },
        {
          title: 'Create Date',
          dataIndex: 'createdate',
          key: 'createdate',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Consignment Date',
          dataIndex: 'consignmentdate',
          key: 'consignmentdate',
        },
        {
          title: 'End Date',
          dataIndex: 'enddate',
          key: 'enddate',
        },
        {
            title: 'Agreement Price',
            dataIndex: 'agreementprice',
            key: 'agreementprice',
        },
        {
          title: 'Note',
          dataIndex: 'note',
          key: 'note',
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (text) => <img src={text} alt="Koi" style={{ width: '50px' }} />, 
    },
        {
            title: 'Type Request',
            dataIndex: 'typerequest',
            key: 'enddate',
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
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                const { status } = record; 

                return (
                    <Space size="middle">
                        {status === 'Pending' && (
                            <Button color="danger" variant="solid"  onClick={() => showModalReject(record)}>
                                Reject
                            </Button>
                        )}
                        {status === 'Confirmed' && (
                            <>
                                <Button color="primary" variant="solid" onClick={() => showModalDecisionRequest(record)} >
                                    Agree
                                </Button>
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
    
      const createDataFromQuotations = (requests) => {
        return requests.map((request) => ({
          key: request.requestId, 
          requestid: request.requestId,
          createdate: new Date(request.createdDate).toLocaleDateString(), 
          consignmentdate: request.consignmentDate || "N/A", 
          enddate: request.endDate || "N/A", 
          agreementprice: request.agreementPrice ? `${request.agreementPrice}.000 VND` : "Free", 
          note: request.quotations.length > 0 ? request.quotations[0].note : "No note",
          image: request.package.koi.image,
          typerequest: request.typeRequest, 
          status: request.status, 
        }));
    };
    
    const data = createDataFromQuotations(requests);
  return (
    <div>
        <Table columns={columns} dataSource={data} 
         pagination={{
        pageSize: pageSize,
        current: pageNumber,
        total: totalCount,
        onChange: handleChangePage,
    }}  />
        <Modal title="Agree" open={isModalRequestDecisionOpen}  onOk={handleOkRequestDecision} onCancel={handleCancelRequestDecision}>
        <p>Bạn có đồng ý với lựa chọn này không</p>
      </Modal>
      <Modal title="Reject" open={isModalRejectOpen}  onOk={handleOkReject} onCancel={handleCancelReject}>
        <p>Bạn có muốn từ chối giao dịch này không</p>
      </Modal>
    </div>
  )
}

export default TableAssigment
