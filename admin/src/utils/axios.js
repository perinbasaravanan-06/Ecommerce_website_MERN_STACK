import axios from "axios";

export const BASE_URL = "https://saravanan-ecommerce.onrender.com/";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if you use cookies
});

export default api;
