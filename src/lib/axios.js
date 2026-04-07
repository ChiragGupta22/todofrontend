import axios from "axios";

const api = axios.create({
  baseURL: "https://todobackend-cqn8.onrender.com/api",
  withCredentials: true,
});

export default api;
