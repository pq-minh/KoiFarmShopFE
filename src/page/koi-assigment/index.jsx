import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { message,Modal } from 'antd';
import "./index.scss";
import { storage } from "../../firebase/firebase";
import api from "../../config/axios";
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
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

//h

 // handle submumit request 
const KoiAssigment =() => {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const [type,setType] = useState(1);
    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [assignmentDate, setAssignmentDate] = useState(null);

    const handleAssignmentDateChange = (date) => {
      setAssignmentDate(date);
    };
    const handleDisabledDate = (current) => {
      return current && current < dayjs().startOf('day'); 
    };
    //
    const disabledEndDate = (current) => {
      if (!assignmentDate) return false; 
      const minEndDate = assignmentDate.clone().add(7, 'days');
      const maxEndDate = assignmentDate.clone().add(60, 'days');
      return current && (current < minEndDate || current > maxEndDate);

    };
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
      setModalVisible(true);
    }
    //
   
  } catch (error) {
    console.error('Error uploading file or creating package:', error);
    message.error('Error uploading file or creating package.');
  }
      };
      //
      const handleModalClose = () => {
        setModalVisible(false);
        setTimeout(() => {
          form.resetFields(); 
        }, 100);
      };
    return (
            <div className=" container koi-assigment">  
             <motion.div
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5 }}
        > 
           <h2 >Koi Assigment</h2>           
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
        form={form}
        onFinish={onFinish}
      >
      <div className=" row">
      <div className="col">
        <Form.Item label="Koi image" valuePropName="fileList" getValueFromEvent={normFile} name="image" >
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
        <Form.Item label="Sex" name="gender">
          <Radio.Group>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Name" 
            name="name"
            rules={[
    {
      required: true, 
      message: 'Please input your name!',
    },
    {
      pattern: /^Koi/, 
      message: 'Name must start with "Koi".'
    }
  ]}
        >
          <Input placeholder="VD: Koi Onwa" />
          
        </Form.Item>
        
        <Form.Item label="Origin" 
            name="origin"
           
        >
          <Input   placeholder="Daichi Koi" />         
        </Form.Item>

        <Form.Item label="Personality" 
            name="personality"
            rules={[
    {
      required: true, 
      message: 'Please input personality!',
    }
  ]}
        >
          <Input placeholder='Friendly' />         
        </Form.Item>

        <Form.Item label="Description"
            name="description"
            rules={[
    {
      required: true, 
      message: 'Please input description!',
    }
  ]}
        >
          <TextArea rows={4} /> 
        </Form.Item>
        </div>
        <div className="col">
        <Form.Item label="Age" name="age"
        rules={[
    {
      required: true,
      message: 'Please input your age!',
    },
    {
      type: 'number',
      max: 19, 
      message: 'Age must be less than 20.',
    }
  ]} >
          <InputNumber placeholder='Years' />
        </Form.Item>

        <Form.Item label="Weight" name="weight" 
        rules={[
    {
      required: true,
      message: 'Please input your weight!',
    },
    {
      validator: (_, value) => {
        if (value <= 1 || value >= 10) {
          return Promise.reject('Weight must be greater than 1 kg and less than 19 kg.');
        }
        return Promise.resolve();
      },
    },
  ]}
        >
           <InputNumber placeholder='kg' />
        </Form.Item>

        <Form.Item label="Size" name="size" 
        rules={[
    {
      required: true,
      message: 'Please input the size of the koi!',
    },
    {
      type: 'number',
      min: 10, 
      max: 150, 
      message: 'The size must be between 10 and 150 cm.',
    },
  ]}
        >
           <InputNumber placeholder='cm' />
           </Form.Item>
         
        <Form.Item label="Start Date" name="assigmentdate" rules={[
    {
      required: true, 
      message: 'Please input start date!',
    }
  ]}>
          <DatePicker disabledDate={ handleDisabledDate}  onChange={handleAssignmentDateChange}/>
        </Form.Item>

        <Form.Item label="End Date" name="enddate" 
        rules={[
    {
      required: true, 
      message: 'Please input end date!',
    }
  ]}>
          <DatePicker disabledDate={disabledEndDate} />
        </Form.Item>

        <Form.Item label="Type Request" name="type" rules={[
    {
      required: true, 
      message: 'Please input type of request',
    }
  ]}  >
          <Radio.Group>
            <Radio value="online" name='online'> Onlline </Radio>
            <Radio value="offline" name='offline'> Offline </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Category" name="category"  rules={[
    {
      required: true, 
      message: 'Please input koi category!',
    }
  ]}>
          <Select>
            <Select.Option value="1">Thuần chủng nhập khẩu </Select.Option>
            <Select.Option value="2">Lai F1 </Select.Option>
            <Select.Option value="3">Thuần Việt</Select.Option>
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
      <Modal
        title="Success"
       open={modalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        okText="OK"
      >
        <p>Your koi assignment has been successfully created!</p>
      </Modal>
            </div>
    )
}
export default KoiAssigment