import axios from "axios";

const api = axios.create({
  baseURL: "https://todobackend-1-phu8.onrender.com/api",
  withCredentials: true,
});

export default api;
