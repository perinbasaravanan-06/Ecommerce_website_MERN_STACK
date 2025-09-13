import axios from "axios";

export const BASE_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if you use cookies
});

export default api;
