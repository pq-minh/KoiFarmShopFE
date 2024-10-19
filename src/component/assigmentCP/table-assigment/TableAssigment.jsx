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
             setRequests(data);
          } catch (err) {
            console.error('API call failed:', err);
          }
        };       
        fetchData('https://localhost:7228/api/request/get-request');
      }, []);   
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
            createdate: request.createdDate,
            consignmentdate: request.consignmentDate,
            enddate: request.endDate,
            agreementprice: request.agreementPrice == 0 ? (request.agreementPrice+ " VND") : (request.agreementPrice + ".000 VND") ,
            typerequest: request.typeRequest, 
            status: request.status
        }));
    };
    
    const data = createDataFromQuotations(requests);
  return (
    <div>
        <Table columns={columns} dataSource={data}  />
        <Modal title="Action" open={isModalRequestDecisionOpen}  onOk={handleOkRequestDecision} onCancel={handleCancelRequestDecision}>
        <p>Bạn có đồng ý với lựa chọn này không</p>
      </Modal>
      <Modal title="Action2" open={isModalRejectOpen}  onOk={handleOkReject} onCancel={handleCancelReject}>
        <p>Bạn có muốn từ chối giao dịch này không</p>
      </Modal>
    </div>
  )
}

export default TableAssigment
