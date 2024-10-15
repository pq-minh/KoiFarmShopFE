import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import "./index.scss";
import { storage } from "../../firebase/firebase";
import api from "../../config/axios";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Upload,
  Select,

} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};


 // handle submumit request 
const KoiAssigment =() => {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const [type,setType] = useState(1);
    //
    const handleFileChange = (info) => {
        setFile(info.file);
      };
    
    const onFinish = async (values) => { 
         // Kiểm tra file
   if (!file) {
    message.warning('Please select a file to upload.');
    return;
  }
  if(values.type === ""){

  }
  const storageRef = ref(storage, `images/${file.name}`);
  
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    setUrl(downloadURL); // Cập nhật URL hình ảnh

    // Tạo formData sau khi tải lên thành công
    const formData = {
        UserId: 2, 
        User: { Id: 1, Name: "John Doe" },
        name: values.name,
        origin: values.origin,
        description: values.description,
        gender: values.gender,
        image: downloadURL, 
        age: values.age,
        weight: values.weight,
        size: values.size,
        personality: values.personality,
        status: "Assigment", 
        fishTypeId: values.category, 
        Packages: [
          {
            quantity: 1, 
            batchKoiId: null,
            Requests: [
              {
                UserId: 2, 
                User: { Id: 1, Name: "John Doe" },
                createdDate: values.assigmentdate,
                relationalRequestId: 5,
                consignmentDate: values.assigmentdate,
                endDate: values.enddate.toISOString().split('T')[0],
                agreementPrice: 0,
                typeRequest: values.type,
                status: "Pending",
                     Quotations: [
                         {
                                createdate: values.assigmentdate.toISOString().split('T')[0],
                                price : 0,
                                status: "Pending",
                         }
                        ]
              }
            ]
          }
        ]
      
    };

    console.log(formData);

    // Gửi formData
    const response = await api.post("request/create-request", formData);
    if (response.status === 200) {
      message.success('Package created successfully.');
    }
  } catch (error) {
    console.error('Error uploading file or creating package:', error);
    message.error('Error uploading file or creating package.');
  }
      };
    return (
            <div className=" container koi-assigment">     
                      
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
        
        }}
        onFinish={onFinish}
      >
      <div className=" row">
      <div className="col">
        <Form.Item label="Image" valuePropName="fileList" getValueFromEvent={normFile} name="image" >
          <Upload  onChange={handleFileChange}
          listType="picture-card"
          beforeUpload={() => false} >
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Radio.Group>
            <Radio value="male"> Name </Radio>
            <Radio value="female"> Nữ </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Name" 
            name="name"
        >
          <Input />
          
        </Form.Item>
        
        <Form.Item label="Origin" 
            name="origin"
        >
          <Input />         
        </Form.Item>

        <Form.Item label="Personality" 
            name="personality"
        >
          <Input />         
        </Form.Item>

        <Form.Item label="Description"
            name="description"
        >
          <TextArea rows={4} /> 
        </Form.Item>
        </div>
        <div className="col">
        <Form.Item label="Age" name="age" >
          <InputNumber />
        </Form.Item>

        <Form.Item label="Weight" name="weight" 
             
        >
          <Input placeholder='kg' />
        </Form.Item>

        <Form.Item label="Size" name="size" >
          <Input placeholder='cm' />
        </Form.Item>
         
        <Form.Item label="Assigment Date" name="assigmentdate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="End Date" name="enddate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Radio.Group>
            <Radio value="online" name='online'> Onlline </Radio>
            <Radio value="offline" name='offline'> Offline </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Select" name="category">
          <Select>
            <Select.Option value="1">Gốc Việt</Select.Option>
            <Select.Option value="2">Gốc Nhật </Select.Option>
            <Select.Option value="3">Việt Lai nhật</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
              <Button type="primary" htmlType="submit" block 
                    className="custom-button"
              >
                Submit
              </Button>
        </Form.Item>
        </div>
        </div>
      </Form>
            </div>
    )
}
export default KoiAssigment