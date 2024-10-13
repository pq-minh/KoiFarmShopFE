import React,{useEffect,useState} from 'react'
import axios from 'axios';
import api from "../../../config/axios";
import { Space, Table, Tag ,Button,Modal,Input } from 'antd';
const KoiAssigment = () => {

    const [quotations,setQuotations] = useState([])
    const [isModalVisible, setModalvisible] = useState(false)
    const [selectedRecord,setSelectedRecord] = useState(null)
    const [formData,setFormData] = useState({field1: '', field2 :''});

    //Fetching data from quotations
    useEffect(() => {
        const fetchData = async (url) => {
          try {
            const token = localStorage.getItem('token')?.replaceAll('"', '');
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
             setQuotations(data);
          } catch (err) {
            console.error('API call failed:', err);
          }
        };       
        fetchData('https://localhost:7228/api/quotation/get-quotation');
      }, []);

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
          note: formData.field2
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

    //Handle Cancel button click
    const handleCancel = () => {
        setModalvisible(false);
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
        },
        {
            title: 'Koi Image',
            dataIndex: 'koiImage', 
            key: 'koiImage',
            render: (text) => <img src={text} alt="Koi" style={{ width: '50px' }} />, 
        },
        {
            title: 'Age',
            dataIndex: 'koiAge', 
            key: 'koiAge',
        },
        {
            title: 'Size',
            dataIndex: 'koiSize', 
            key: 'koiSize',
        },
        {
            title: 'Weight',
            dataIndex: 'koiWeight', 
            key: 'koiWeight',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                <Button onClick={() => handleUpdate(record)}> <a>Update </a></Button>                
                    <a>Delete </a>
                </Space>
            ),
        },
    ];
    
      const createDataFromQuotations = (quotations) => {
        return quotations.map((quotation) => ({
            key: quotation.quotationId, 
            quotationId: quotation.quotationId, 
            requestId: quotation.requestId,
            koiname: quotation.koiName || 'N/A', 
            koiImage: quotation.koiImage || '', 
            koiAge: quotation.koiAge || 'N/A', 
            koiSize: quotation.koiSize || 'N/A', 
            koiWeight: quotation.koiWeight || 'N/A', 
            status: quotation.status || 'N/A', 
            price: quotation.price || 0, 
            note: quotation.note || 'N/A', 
        }));
    };

    const data = createDataFromQuotations(quotations);

  return (
    <div>
        <Table columns={columns} dataSource={data} />
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
    </div>
  )
}

export default KoiAssigment
