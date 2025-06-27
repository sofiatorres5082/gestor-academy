import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // podés usar una variable de entorno si querés
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
