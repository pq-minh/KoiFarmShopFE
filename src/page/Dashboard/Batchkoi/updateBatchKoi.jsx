import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../config/axios';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button, Upload, message, Image } from 'antd';

function UpdateBatchKoi() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataKoi, setDataKoi] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [certificateFileList, setCertificateFileList] = useState([]);
  const navigate = useNavigate();

  // Fetch batch koi details
  const fetchKoiById = async (batchKoiId) => {
    try {
      const response = await api.get(`batchkois/management/get/${batchKoiId}`);
      setDataKoi(response.data);
      if (response.data.image) {
        setFileList([{ url: response.data.image }]);
      }
      if (response.data.certificate) {
        setCertificateFileList([{ url: response.data.certificate }]);
      }
    } catch (error) {
      message.error('Failed to fetch koi data');
    }
  };

  // Update form values when dataKoi changes
  useEffect(() => {
    if (dataKoi) {
      form.setFieldsValue({
        BatchKoiName: dataKoi.name,
        Description: dataKoi.description,
        Age: dataKoi.age,
        Quantity: dataKoi.quantity,
        Weight: dataKoi.weight,
        Size: dataKoi.size,
        Origin: dataKoi.origin,
        Gender: dataKoi.gender,
        BatchTypeId: dataKoi.batchTypeId,
        Price: dataKoi.price,
        Status: dataKoi.status,
      });
    }
  }, [dataKoi]);

  const handleUpdate = async (values) => {
    const formData = new FormData();
    formData.append("batchKoiId", id); // Add ID to the form data
    formData.append("BatchKoiName", values.BatchKoiName);
    formData.append("Description", values.Description);
    formData.append("Age", values.Age);
    formData.append("Quantity", values.Quantity);
    formData.append("Weight", values.Weight);
    formData.append("Size", values.Size);
    formData.append("Origin", values.Origin);
    formData.append("Gender", values.Gender);
    formData.append("BatchTypeId", values.BatchTypeId);
    formData.append("Price", values.Price);
    formData.append("Status", values.Status);

    if (fileList[0]?.originFileObj) {
      formData.append("BatchKoiImage", fileList[0].originFileObj);
    }
    if (certificateFileList[0]?.originFileObj) {
      formData.append("Certificate", certificateFileList[0].originFileObj);
    }

    try {
      await api.put(`/batchkois/management/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Koi batch updated successfully");
      navigate('/admin/batchkoi');
    } catch (error) {
      message.error("Failed to update koi batch");
    }
};

  const handleKoiImageChange = ({ fileList }) => setFileList(fileList);
  const handleCertificateChange = ({ fileList }) => setCertificateFileList(fileList);

  useEffect(() => {
    fetchKoiById(id);
  }, [id]);

  return (
    <>
      {dataKoi && dataKoi.image && (
        <Image width={200} src={dataKoi.image} alt="Koi Batch Image" />
      )}
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item name="BatchKoiName" label="Batch Koi Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="Age" label="Age" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="Quantity" label="Quantity" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="Weight" label="Weight" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="Size" label="Size" rules={[{ required: true }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item name="Origin" label="Origin" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="Gender" label="Gender" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="BatchTypeId" label="Batch Type ID" rules={[{ required: true }]}>
        <Select>
            <Select.Option value="1">F1</Select.Option>
            <Select.Option value="2">Thuần Chủng</Select.Option>
            <Select.Option value="3">Lai</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="Price" label="Price" rules={[{ required: true }]}>
          <Input type="number" step="0.01" />
        </Form.Item>
        <Form.Item name="Status" label="Status">
          <Select>
            <Select.Option value="OnSale">OnSale</Select.Option>
            <Select.Option value="Sold">Sold</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="BatchKoiImage" label="Koi Image">
          <Upload
            name="BatchKoiImage"
            listType="picture"
            fileList={fileList}
            onChange={handleKoiImageChange}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Upload BatchKoi Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="Certificate" label="Certificate">
          <Upload
            name="Certificate"
            listType="picture"
            fileList={certificateFileList}
            onChange={handleCertificateChange}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Upload Certificate</Button>
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit">Update</Button>
      </Form>
    </>
  );
}

export default UpdateBatchKoi;
