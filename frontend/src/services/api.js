import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // o variable de entorno
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // o de AuthContext si usás hooks
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
