// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  DesktopOutlined,
  PlusCircleOutlined,
  PieChartOutlined,
  UserOutlined,
  UploadOutlined,
  SyncOutlined ,
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
  Select
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
    getItem("Update Koi", "updateKoi",<SyncOutlined />),
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
  const [form] = Form.useForm(); 
  const [koiId, setKoiId] = useState(null); 
  const [koiData, setKoiData] = useState(null); 


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick = (e) => {
    setSelectedKey(e.key);
    form.resetFields(); 
    if (e.key === 'Update') {
      setKoiId(null);
      setKoiData(null);
    }  
  };

  const fetchKoiById = async(koiId) => {
    api.get(`kois/management/${koiId}`)
      .then(response => {
        setKoiData(response.data); 
        form.setFieldsValue(response.data); 
      })
      .catch(() => {
        notification.error({
          message: "Error",
          description: "Koi fish not found!",
        });
      });
  };
  
  const handleKoiSubmit = (values) => {
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

  const handleUpdateKoiSubmit = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "ImageFile" && values[key] && values[key].length > 0) {
        formData.append(key, values[key][0].originFileObj); 
      } else {
        formData.append(key, values[key]);
      }
    });
  
    api.put(`/kois/management/${koiId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      notification.success({
        message: "Success",
        description: "Koi fish updated successfully!",
      });
      form.resetFields();
      setKoiData(null); 
    })
    .catch(() => {
      notification.error({
        message: "Error",
        description: "An error occurred during the update.",
      });
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
  
    api.post("/batchkois/management", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        notification.success({
          message: "Success",
          description: "Batch Koi added successfully!",
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
    <Form form={form} layout="vertical" onFinish={handleKoiSubmit}>
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

  const renderUpdateKoiForm = () => (
    <div>
      <Form layout="inline" onFinish={(values) => fetchKoiById(values.koiId)}>
        <Form.Item name="koiId" label="Koi ID" rules={[{ required: true, message: "Please input Koi ID!" }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">Tìm kiếm</Button>
      </Form>
  
      {koiData && (
        <Form form={form} layout="vertical" onFinish={handleUpdateKoiSubmit}>
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
  
          <Form.Item name="ImageFile" label="Image">
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
      )}
    </div>
  );
  

  const renderAddBatchKoiForm = () => (
    <Form form={form} layout="vertical" onFinish={handleBatchKoiSubmit}>
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
        name="BatchTypeId"
        label="Batch Type ID"
        rules={[{ required: true, message: "Please input the batch type ID!" }]}
      >
        <Input type="number" />
      </Form.Item>
  
      <Form.Item
        name="Name"
        label="Name"
        rules={[{ required: true, message: "Please input the batch koi name!" }]}
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
        name="Certificate"
        label="Certificate"
        rules={[{ required: true, message: "Please input the certificate!" }]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item
        name="Price"
        label="Price (VND)"
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <Input type="number" />
      </Form.Item>
  
      <Form.Item
        name="Status"
        label="Status"
        rules={[{ required: true, message: "Please input the status!" }]}
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
            {selectedKey === "updateKoi" && renderUpdateKoiForm() }
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Koi Management Dashboard ©2024</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
