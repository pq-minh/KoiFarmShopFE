import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import "./index.scss";
import { storage } from "../../firebase/firebase";
import api from "../../config/axios";
import { motion } from 'framer-motion';

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
const [form] = Form.useForm();
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
        status: "Assigned", 
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
      message.success('Create request successfully.');
      form.resetFields();
    }
  } catch (error) {
    console.error('Error uploading file or creating package:', error);
    message.error('Error uploading file or creating package.');
  }
      };
    return (
            <div className=" container koi-assigment">  
             <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5 }}
        > 
           <h2 >Ký gửi cá koi</h2>           
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
        <Form.Item label="Ảnh cá" valuePropName="fileList" getValueFromEvent={normFile} name="image" >
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
        <Form.Item label="Giới tính" name="gender">
          <Radio.Group>
            <Radio value="male"> Đực </Radio>
            <Radio value="female"> Cái </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên" 
            name="name"
        >
          <Input placeholder="VD: Koi Onwa" />
          
        </Form.Item>
        
        <Form.Item label="Nguồn gốc" 
            name="origin"
           
        >
          <Input   placeholder="Daichi Koi" />         
        </Form.Item>

        <Form.Item label="Tính cách" 
            name="personality"
        >
          <Input placeholder='Hiền' />         
        </Form.Item>

        <Form.Item label="Mô tả"
            name="description"
        >
          <TextArea rows={4} /> 
        </Form.Item>
        </div>
        <div className="col">
        <Form.Item label="Tuổi" name="age" >
          <InputNumber />
        </Form.Item>

        <Form.Item label="Cân nặng" name="weight" 
             
        >
          <Input placeholder='kg' />
        </Form.Item>

        <Form.Item label="Kích thước" name="size" >
          <Input placeholder='cm' />
        </Form.Item>
         
        <Form.Item label="Ngày kí gửi" name="assigmentdate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Ngày kết thúc" name="enddate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Loại kí gửi" name="type">
          <Radio.Group>
            <Radio value="online" name='online'> Onlline </Radio>
            <Radio value="offline" name='offline'> Offline </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Loại cá" name="category">
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
      </motion.div>  
            </div>
    )
}
export default KoiAssigment