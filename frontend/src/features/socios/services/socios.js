import axios from "axios";

const API_URL = "http://localhost:8000/api"; // ajustá esto si cambiás URL

export const getSocios = async (page = 1) => {
  const response = await axios.get(`${API_URL}/socios?page=${page}`);
  return response.data;
};

export const getSociosInactivos = async (page = 1) => {
  const response = await axios.get(`${API_URL}/socios/inactivos?page=${page}`);
  return response.data;
};

export const crearSocio = async (nuevoSocio) => {
  const response = await axios.post(`${API_URL}/socios`, nuevoSocio);
  return response.data;
};
