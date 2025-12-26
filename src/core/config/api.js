import axios from "axios";

export const API_URL = "https://localhost:51544/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
