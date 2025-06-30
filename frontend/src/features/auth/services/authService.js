import api from "../../../services/api";

export const login = async (email, password) => {
  const res = await api.post("/login", { email, password });
  return res.data;
};

export const logout = async (token) => {
  return await api.post("/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkAuthRequest = () =>
  api.get("/auth/check", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
