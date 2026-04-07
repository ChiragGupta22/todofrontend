import axios from "axios";

export default axios.create({
  baseURL:
    "https://backend1-1-f2a5.onrender.com/api " || "http://localhost:3000/api",
  withCredentials: true,
});
