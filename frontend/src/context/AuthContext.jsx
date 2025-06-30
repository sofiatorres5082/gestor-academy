import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthRequest , logout as logoutRequest } from "../features/auth/services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem("admin");
    return stored ? JSON.parse(stored) : null;
  });
  const [isAuth, setIsAuth] = useState(!!token);
  const [loading, setLoading] = useState(true);

  const loginUser = (adminData, accessToken) => {
    setToken(accessToken);
    setAdmin(adminData);
    setIsAuth(true);
    localStorage.setItem("token", accessToken);
    localStorage.setItem("admin", JSON.stringify(adminData));
  };

  const logoutUser = async () => {
    try {
      if (token) {
        await logoutRequest(token);
      }
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    } finally {
      setToken(null);
      setAdmin(null);
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        setIsAuth(false);
        return;
      }

      try {
        const res = await checkAuthRequest();
        setAdmin(res.data);
        setIsAuth(true);
      } catch (err) {
        logoutUser();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, admin, isAuth, loading, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
