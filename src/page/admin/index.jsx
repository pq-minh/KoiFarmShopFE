// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import updateKoi from "./updatekoi";
import {
  DesktopOutlined,
  PlusCircleOutlined,
  PieChartOutlined,
  UserOutlined,
  UploadOutlined,
  SyncOutlined,
  EyeOutlined,
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
import { Link, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
//const navigate = useNavigate();
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Kois Management", "sub1", <UserOutlined />, [
    getItem("View All Koi", "viewKoi", <EyeOutlined />),
    getItem("Add Koi", "addKoi", <PlusCircleOutlined />),
    getItem("Update Koi", "updateKoi", <SyncOutlined />),
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

  


  const ViewAllKoi = () => {
    const [koiList, setKoiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [koiId, setKoiId] = useState(null);
//Get handle koi id
const handleKoiId= (id)=>{
console.log("koiid", id);
}
    useEffect(() => {
      const fetchKoiData = async () => {
        try {
          const response = await api.get("/kois/management");
          setKoiList(response.data);
          
          
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchKoiData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching koi data: {error.message}</div>;

    return (
      <div className="koi-list">
        <h2>Danh sách cá koi</h2>
        <div className="koi-cards">
          {koiList.map((koi) => (
            <div className="koi-card" key={koi.koiId}>
              <img className="koi-image" src={koi.image} alt={koi.name} />
              <h3>{koi.name}</h3>
              <p>Xuất xứ: {koi.origin}</p>
              <p>Giới tính: {koi.gender}</p>
              <p>Độ tuổi: {koi.age} năm</p>
              <p>Trọng lượng: {koi.weight} kg</p>
              <p>Kích thước: {koi.size} cm</p>
              <p>Tính cách: {koi.personality}</p>
              <p>Giá: ${koi.price}</p>
              <p>Trạng thái: {koi.status}</p>
              <Button
          
                onClick={() => handleKoiId(koi.koiId, setSelectedKey("updatekoi"))}
              >
                Update
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
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
            {selectedKey === "updateKoi" && <Link to={`/updatekoi/:${id}`}>Update</Link>}
            {selectedKey === "viewKoi" && <ViewAllKoi />}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Koi Management Dashboard ©2024</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
