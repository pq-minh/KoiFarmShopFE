// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  DesktopOutlined,
  PlusCircleOutlined,
  PieChartOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Form,
  Input,
  Button,
  notification,
  Upload,
} from "antd";
import api from "../../config/axios";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Kois Management", "sub1", <UserOutlined />, [
    getItem("Add Koi", "addKoi", <PlusCircleOutlined />),
    getItem("Alex", "5"),
  ]),
  getItem("Batch Koi Management", "sub2", <UserOutlined />, [
    getItem("Add Batch Koi", "addBatchKoi", <PlusCircleOutlined />),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <PlusCircleOutlined />),
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const [form] = Form.useForm(); // Initialize the form instance

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick = (e) => {
    setSelectedKey(e.key);
    form.resetFields(); // Reset fields when switching menus
  };

  const handleFormSubmit = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "ImageFile" && values[key] && values[key].length > 0) {
        formData.append(key, values[key][0].originFileObj); 
      } else {
        formData.append(key, values[key]);
      }
    });
    api
      .post("/kois/management", formData, {
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
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
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

  const handleBatchKoiSubmit = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "ImageFile" && values[key] && values[key].length > 0) {
        formData.append(key, values[key][0].originFileObj); 
      } else {
        formData.append(key, values[key]);
      }
    });
    api
      .post("/batchkois/management", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        notification.success({
          message: "Success",
          description: "BatchKoi added successfully!",
        });
        form.resetFields(); 
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
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

  const renderAddKoiForm = () => (
    <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
      <Form.Item
        name="ImageFile"
        label="Image"
        rules={[{ required: true, message: "Please upload an image!" }]}
      >
        <Upload
          name="ImageFile"
          listType="picture"
          beforeUpload={() => false} 
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
        <Input type="number" />
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
      <Form.Item
        name="Gender"
        label="Gender"
        rules={[{ required: true, message: "Please input the gender!" }]}
      >
        <Input />
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
      <Form.Item
        name="Status"
        label="Status"
        rules={[{ required: true, message: "Please input the status!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Certificate"
        label="Certificate"
        rules={[{ required: true, message: "Please input the certificate!" }]}
      >
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );

  const renderAddBatchKoiForm = () => (
    <Form form={form} layout="vertical" onFinish={handleBatchKoiSubmit}>
        <Form.Item
            name="Name"
            label="Name"
            rules={[{ required: true, message: "Please input the koi fish name!" }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="Quantity"
            label="Quantity"
            rules={[{ required: true, message: "Please input a valid quantity!" }]}
        >
            <Input type="number" min={1} />
        </Form.Item>
        <Form.Item
            name="BatchTypeId"
            label="Batch Type Id"
            rules={[{ required: true, message: "Please select the batch type!" }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="ImageFile"
            label="Image"
            rules={[{ required: true, message: "Please upload an image!" }]}
        >
            <Upload
                name="ImageFile"
                listType="picture"
                beforeUpload={() => false} 
                onChange={({ fileList }) => {
                    form.setFieldsValue({ ImageFile: fileList }); 
                }}
            >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </Form.Item>
        <Form.Item
            name="Description"
            label="Description"
            rules={[{ required: true, message: "Please input a description!" }]}
        >
            <Input.TextArea />
        </Form.Item>
        <Form.Item
            name="Origin"
            label="Origin"
            rules={[{ required: true, message: "Please input the origin!" }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="Gender"
            label="Gender"
            rules={[{ required: true, message: "Please input the gender!" }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="Weight"
            label="Weight (kg)"
            rules={[{ required: true, message: "Please input the weight!" }]}
        >
            <Input type="number" min={0} step="0.1" />
        </Form.Item>
        <Form.Item
        name="Age"
        label="Age"
        rules={[{ required: true, message: "Please input the age!" }]}
      >
        <Input type="number" />
      </Form.Item>
        <Form.Item
            name="Size"
            label="Size (cm)"
            rules={[{ required: true, message: "Please input the size!" }]}
        >
            <Input type="number" min={0} />
        </Form.Item>
        <Form.Item
            name="Price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
        >
            <Input type="number" min={0} step="0.01" />
        </Form.Item>
        <Form.Item
            name="Status"
            label="Status"
            rules={[{ required: true, message: "Please input the status!" }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="Certificate"
            label="Certificate"
            rules={[{ required: true, message: "Please input the certificate!" }]}
        >
            <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
            Submit
        </Button>
    </Form>
);


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ background: colorBgContainer }}>
          <div className="logo" />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedKey}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            {selectedKey === "addKoi" && renderAddKoiForm()}
            {selectedKey === "addBatchKoi" && renderAddBatchKoiForm()}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Koi Management Dashboard ©2024</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
