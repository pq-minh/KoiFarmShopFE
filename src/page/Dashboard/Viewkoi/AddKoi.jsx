import React from 'react';
import { Form, Input, Upload, Button, notification,Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../../../config/axios'; // Adjust the import based on your project structure
import { useNavigate } from 'react-router-dom';
import './AddKoi.scss';

function AddKoi() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleKoiSubmit = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if ((key === "KoiImage" || key === "Certificate") && values[key] && values[key].length > 0) {
        formData.append(key, values[key][0].originFileObj);
      } else {
        formData.append(key, values[key]);
      }
    });

    api
      .post("/kois/management/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        notification.success({
          message: "Success",
          description: "Koi fish added successfully!",
        });
        form.resetFields();
        navigate('/admin/viewkoi');
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
    <div className="add-koi">
      <h2>Add Koi Fish</h2>
      <Form form={form} layout="vertical" onFinish={handleKoiSubmit}>
        
        <Form.Item
          name="KoiImage"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload
            name="KoiImage"
            listType="picture"
            beforeUpload={() => false} // Prevent automatic upload
            onChange={({ fileList }) => {
              form.setFieldsValue({ ImageFile: fileList });
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="FishTypeId"
          label="Fish Type ID"
          rules={[{ required: true, message: "Please input the fish type ID!" }]}
        >
          <Select>
            <Select.Option value="1">Thuần chủng nhập khẩu </Select.Option>
            <Select.Option value="2">Lai F1</Select.Option>
            <Select.Option value="3">Thuần việt</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Name"
          label="Name"
          rules={[{ required: true, message: "Please input the koi fish name!" }]}
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

        <Form.Item
          name="Description"
          label="Description"
          rules={[{ required: true, message: "Please input a description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="Gender" label="Gender" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="Age"
          label="Age"
          rules={[{ required: true, message: "Please input the age!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="Weight"
          label="Weight (kg)"
          rules={[{ required: true, message: "Please input the weight!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="Size"
          label="Size (cm)"
          rules={[{ required: true, message: "Please input the size!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="Price"
          label="Price (VND)"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="Personality"
          label="Personality"
          rules={[{ required: true, message: "Please input the personality!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="Status" label="Status">
          <Select>
            <Select.Option value="OnSale">OnSale</Select.Option>
            <Select.Option value="Sold">Sold</Select.Option>
          </Select>
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
            listType="picture"
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

export default AddKoi;