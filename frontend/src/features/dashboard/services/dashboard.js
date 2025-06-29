import api from "../../../services/api";

export const getResumenDashboard = () =>
  api.get("/admin/dashboard/resumen").then((res) => res.data);

export const getTalleres = () =>
  api.get("/talleres").then((res) => res.data.data); // paginado

export const getSociosDeTaller = (tallerId) =>
  api.get(`/talleres/${tallerId}/socios`).then((res) => res.data);

export const getSocios = () =>
  api.get("/socios").then((res) => res.data.data); // paginado
