import axios from "axios";
const baseUrl = "http://localhost:5167/api/";
// const baseUrl = "http://localhost:8080/api/";

const config = {
  baseUrl: baseUrl,
};

const api = axios.create(config);

api.defaults.baseURL = baseUrl;


const handleBefore = (config) => {
  
  const token = localStorage.getItem("token")?.replaceAll('"', "");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

api.interceptors.request.use(handleBefore, null);

export default api;
