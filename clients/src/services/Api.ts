import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((config) => {
  const tok = localStorage.getItem("token");
  if (tok && config.headers) {
    config.headers.Authorization = `Bearer ${tok}`;
  }
  return config;
});

export default API;
