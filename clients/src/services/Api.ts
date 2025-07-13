import axios from "axios";

const API = axios.create({ baseURL: "https://blog-it-fullstack.onrender.com/api" });

API.interceptors.request.use((config) => {
  const tok = localStorage.getItem("token");
  if (tok && config.headers) {
    config.headers.Authorization = `Bearer ${tok}`;
  }
  return config;
});

export default API;
