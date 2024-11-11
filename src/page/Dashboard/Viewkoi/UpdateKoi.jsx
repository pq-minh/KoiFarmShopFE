import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../../../config/axios';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button, Upload, message, Image } from 'antd';

function UpdateKoi() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [form] = Form.useForm();
  const [dataKoi, setDataKoi] = useState(null);
  const [imageFileList, setImageFileList] = useState([]);
  const [certificateFileList, setCertificateFileList] = useState([]);

  // Fetch Koi Data by ID
  const fetchKoiById = async (koiId) => {
    try {
      const response = await api.get(`kois/management/get/${koiId}`);
      setDataKoi(response.data);
      setImageFileList([{ url: response.data.image }]);
      setCertificateFileList([{ url: response.data.certificate }]);
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch koi data');
    }
  };

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
      });
    }
  }, [dataKoi]);

  const handleUpdate = async (values) => {
    const formData = new FormData();
    formData.append("koiId", id); // Add ID to the form data
    formData.append("KoiImage", imageFileList[0]?.originFileObj || imageFileList[0]?.url);
    formData.append("Certificate", certificateFileList[0]?.originFileObj || certificateFileList[0]?.url);

    // Append the rest of the fields
    Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
    });

    try {
        await api.put(`/kois/management/update`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Koi updated successfully");
        navigate('/admin/viewkoi'); // Redirect after successful update
    } catch (error) {
        message.error("Failed to update koi");
        console.error("Update Error:", error);
    }
};


  const handleImageChange = ({ fileList }) => setImageFileList(fileList);
  const handleCertificateChange = ({ fileList }) => setCertificateFileList(fileList);

  useEffect(() => {
    fetchKoiById(id);
  }, [id]);
  return (
    <>
      <Image width={200} src={dataKoi?.image} />
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item name="KoiImage" label="Image">
          <Upload
            name="KoiImage"
            listType="picture"
            fileList={imageFileList}
            onChange={handleImageChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Click to Upload Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="Certificate" label="Certificate">
          <Upload
            name="Certificate"
            listType="picture"
            fileList={certificateFileList}
            onChange={handleCertificateChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Click to Upload Certificate</Button>
          </Upload>
        </Form.Item>

        {/* Remaining Form Fields */}
        <Form.Item name="FishTypeId" label="Fish Type ID" rules={[{ required: true }]}>
        <Select>
            <Select.Option value="1">Thuần chủng nhập khẩu</Select.Option>
            <Select.Option value="2">Lai F1</Select.Option>
            <Select.Option value="3">Thuần việt</Select.Option>
          </Select>
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
            <Select.Option value="OnSale">OnSale</Select.Option>
            <Select.Option value="Sold">Sold</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="Price" label="Price" rules={[{ required: true }]}>
          <Input type="number" step="0.01" />
        </Form.Item>

        <Button type="primary" htmlType="submit">Update</Button>
      </Form>
    </>
  );
}

export default UpdateKoi;
