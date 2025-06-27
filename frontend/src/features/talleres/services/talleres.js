import api from "../../../services/api";

export const getTalleres = (page = 1) =>
  api.get(`/talleres?page=${page}`).then((res) => res.data);

export const getTaller = (id) =>
  api.get(`/talleres/${id}`).then((res) => res.data);

export const crearTaller = (data) =>
  api.post("/talleres", data).then((res) => res.data);

export const actualizarTaller = (id, data) =>
  api.put(`/talleres/${id}`, data).then((res) => res.data);

export const eliminarTaller = (id) =>
  api.delete(`/talleres/${id}`).then((res) => res.data);

export const getTalleresInactivos = (page = 1) =>
  api.get(`/talleres/inactivos?page=${page}`).then((res) => res.data);

export const restaurarTaller = (id) =>
  api.put(`/talleres/${id}/restaurar`).then((res) => res.data);