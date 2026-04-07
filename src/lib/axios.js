import axios from "axios";

export default axios.create({
  baseURL: "https://backend1-1-f2a5.onrender.com/api",
  withCredentials: true,
});
