import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000/api/v1",
  baseURL:"https://dummyjson.com",
  timeout: 5000,
});


export default axiosInstance;
