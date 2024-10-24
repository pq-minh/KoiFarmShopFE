import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../config/axios';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button, Upload, message, Image } from 'antd';

function UpdateKoi() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataKoi, setDataKoi] = useState(null); // Initialize as null
  const [fileList, setFileList] = useState(null);

  // Call Koi Detail
  const fetchKoiById = async (koiId) => {
    try {
      const response = await api.get(`kois/management/${koiId}`);
      console.log("response", response);
      setDataKoi(response.data); // Set fetched data
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch koi data');
    }
  };

  // Update form values when dataKoi changes
  useEffect(() => {
    if (dataKoi) {
      form.setFieldsValue({
        FishTypeId: dataKoi.fishTypeId,
        KoiName: dataKoi.name,
        Origin: dataKoi.origin,
        Description: dataKoi.description,
        Gender: dataKoi.gender, 
        Age: dataKoi.age, 
        Weight: dataKoi.weight, 
        Size: dataKoi.size, 
        Personality: dataKoi.personality, 
        Status: dataKoi.status, 
        Price: dataKoi.price, 
        Certificate: dataKoi.certificate 
      });
    }
  }, [dataKoi]); 

 console.log("file", fileList);

  const handleUpdate = async (values) => {
      const update ={
        KoiImage: fileList[0].originFileObj,
        FishTypeId: values.fishTypeId,
        KoiName: values.name,
        Origin: values.origin,
        Description: values.description,
        Gender: values.gender, 
        Age: values.age, 
        Weight: values.weight, 
        Size: values.size, 
        Personality: values.personality, 
        Status: values.status, 
        Price: values.price, 
        Certificate: values.certificate,
      }
      api.put(`/kois/management/${id}`, update, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        message.success("successfully");
        fetchKoiById(id);
      })
      .catch((error) => {
        message.error("error",error)
      })
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  useEffect(() => {
    fetchKoiById(id);
  }, [id]); // Fetch data when component mounts or id changes

  return (
    <>
     <Image
      width={200}
      src={dataKoi?.image}
    />
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item name="ImageFile" label="Image">
          <Upload
            name="ImageFile"
            listType="picture"
            fileList={fileList}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="FishTypeId" label="Fish Type ID" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="KoiName" label="Koi Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Origin" label="Origin" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="Gender" label="Gender" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="Age" label="Age" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="Weight" label="Weight" rules={[{ required: true }]}>
          <Input type="number" step="0.01" />
        </Form.Item>
        <Form.Item name="Size" label="Size" rules={[{ required: true }]}>
          <Input type="number" step="0.01" />
        </Form.Item>
        <Form.Item name="Personality" label="Personality">
          <Input />
        </Form.Item>
        <Form.Item name="Status" label="Status">
          <Select>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="Price" label="Price" rules={[{ required: true }]}>
          <Input type="number" step="0.01" />
        </Form.Item>
        <Form.Item name="Certificate" label="Certificate">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">Update</Button>
      </Form>
    </>
  );
}

export default UpdateKoi;
