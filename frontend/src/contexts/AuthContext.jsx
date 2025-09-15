import { createContext, useState, useEffect } from "react";
import { fetchDataUserGet } from "../services/fetchDataUserGet";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  const login = (newToken, user) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
    setUserInfo(user);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setUserInfo(null);
  };

  useEffect(() => {
    if (token)
      fetchDataUserGet(`${import.meta.env.VITE_BASE_API}/api/users/me`)
        .then((userInfo) => setUserInfo(userInfo))
        .catch((error) => console.error("Erreur lors du chargement", error));
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, userInfo, login, logout, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}
