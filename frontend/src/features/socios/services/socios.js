import axios from "axios";

const API_URL = "http://localhost:8000/api"; 

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

export const obtenerSocio = async (id) => {
  const response = await axios.get(`${API_URL}/socios/${id}`);
  return response.data;
};

export const actualizarSocio = async (id, data) => {
  const response = await axios.put(`${API_URL}/socios/${id}`, data);
  return response.data;
};

export const eliminarSocio = async (id) => {
  const response = await axios.delete(`${API_URL}/socios/${id}`);
  return response.data;
};

export const restaurarSocio = async (id) => {
  const response = await axios.put(`${API_URL}/socios/${id}/restaurar`);
  return response.data;
};
