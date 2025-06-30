import api from "../../../services/api";

export const getSocios = (page = 1) =>
  api.get(`/socios?page=${page}`).then((res) => res.data);

export const getSociosInactivos = (page = 1) =>
  api.get(`/socios/inactivos?page=${page}`).then((res) => res.data);

export const crearSocio = (data) =>
  api.post("/socios", data).then((res) => res.data);

export const obtenerSocio = (id) =>
  api.get(`/socios/${id}`).then((res) => res.data);

export const actualizarSocio = (id, data) =>
  api.put(`/socios/${id}`, data).then((res) => res.data);

export const eliminarSocio = (id) =>
  api.delete(`/socios/${id}`).then((res) => res.data);

export const restaurarSocio = (id) =>
  api.put(`/socios/${id}/restaurar`).then((res) => res.data);

export const getTalleresDeSocio = async (id) => {
  const response = await api.get(`/socios/${id}/talleres`);
  return response.data;
};