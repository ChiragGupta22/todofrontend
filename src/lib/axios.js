import axios from "axios";

const api = axios
  .create({
    baseURL: "https://todobackend-1-phu8.onrender.com/api",
    withCredentials: true,
  })
  .then((res) => {
    console.log("USER:", res.data);
  })
  .catch((err) => {
    console.error(err);
  });

export default api;
