import axios from "axios";
const baseUrl = "http://localhost:5167/api/";

const config = {
  baseUrl: baseUrl,
};

const api2 = axios.create(config);

api2.defaults.baseURL = baseUrl;


const handleBefore = (config) => {
  
  const token = sessionStorage.getItem("token")?.replaceAll('"', "");
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json-patch+json";
  return config;
};

api2.interceptors.request.use(handleBefore, null);

export default api2;
