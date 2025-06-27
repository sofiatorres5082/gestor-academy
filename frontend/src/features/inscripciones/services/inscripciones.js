import api from "../../../services/api";

export const inscribirSocio = (socioId, tallerId) =>
  api.post(`/inscripciones/${socioId}/${tallerId}`);

export const desinscribirSocio = (socioId, tallerId) =>
  api.delete(`/inscripciones/${socioId}/${tallerId}`);

export const obtenerTalleresDeSocio = (socioId) =>
  api.get(`/socios/${socioId}/talleres`);

export const obtenerSociosDeTaller = (tallerId) =>
  api.get(`/talleres/${tallerId}/socios`);
