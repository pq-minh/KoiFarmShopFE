import React from 'react';
import { Form, Input, Upload, Button, notification,Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../../../config/axios'; 
import { useNavigate } from 'react-router-dom';

function AddBatchKoi() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleBatchKoiSubmit = (values) => {
    const formData = new FormData();

    // Append Koi image and certificate
    if (values.KoiImage && values.KoiImage.length > 0) {
      formData.append("KoiImage", values.KoiImage[0].originFileObj);
    } else {
      notification.error({
        message: "Error",
        description: "Please upload a koi image!",
      });
      return;
    }

    if (values.Certificate && values.Certificate.length > 0) {
      formData.append("Certificate", values.Certificate[0].originFileObj);
    } else {
      notification.error({
        message: "Error",
        description: "Please upload a certificate!",
      });
      return;
    }

    // Append other fields
    Object.keys(values).forEach((key) => {
      if (key !== "KoiImage" && key !== "Certificate") {
        formData.append(key, values[key]);
      }
    });

    api
      .post("/batchkois/management/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        notification.success({
          message: "Success",
          description: "Koi fish batch added successfully!",
        });
        form.resetFields();
        navigate('/admin/batchkoi');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors;
          Object.keys(errors).forEach((field) => {
            notification.error({
              message: "Error",
              description: `${field}: ${errors[field].join(", ")}`,
            });
          });
        } else {
          notification.error({
            message: "Error",
            description: "An unexpected error occurred.",
          });
        }
      });
  };

  return (
    <div className="add-batch-koi">
      <h2>Add Batch Koi Fish</h2>
      <Form form={form} layout="vertical" onFinish={handleBatchKoiSubmit}>

        <Form.Item
          name="Name"
          label="Name"
          rules={[{ required: true, message: "Please input the koi fish name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Description"
          label="Description"
          rules={[{ required: true, message: "Please input a description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="Age"
          label="Age"
          rules={[{ required: true, message: "Please input the age!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please input the quantity!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Weight"
          label="Weight (kg)"
          rules={[{ required: true, message: "Please input the weight!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Size"
          label="Size (cm)"
          rules={[{ required: true, message: "Please input the size!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Origin"
          label="Origin"
          rules={[{ required: true, message: "Please input the origin!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="Gender" label="Gender" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="BatchTypeId"
          label="Batch Type ID"
          rules={[{ required: true, message: "Please input the batch type ID!" }]}
        >
          <Select>
            <Select.Option value="1">Thuần chủng nhập khẩu</Select.Option>
            <Select.Option value="2">Lai F1</Select.Option>
            <Select.Option value="3">Thuần Việt</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Price"
          label="Price (VND)"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item name="Status" label="Status">
          <Select>
            <Select.Option value="OnSale">OnSale</Select.Option>
            <Select.Option value="Sold">Sold</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="KoiImage"
          label="Koi Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload a koi image!" }]}
        >
          <Upload
            name="KoiImage"
            beforeUpload={() => false} 
            onChange={({ fileList }) => {
              form.setFieldsValue({ KoiImage: fileList });
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload BatchKoi Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="Certificate"
          label="Certificate"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload a certificate!" }]}
        >
          <Upload
            name="Certificate"
            beforeUpload={() => false}
            onChange={({ fileList }) => {
              form.setFieldsValue({ Certificate: fileList });
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload Certificate</Button>
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddBatchKoi;
