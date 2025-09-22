import { createContext, useState, useEffect } from "react";
import { fetchDataUserGet } from "../services/fetchDataUserGet";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    // Recuperation direct
    return sessionStorage.getItem("token");
  });
  const [userInfo, setUserInfo] = useState(null);

  // For the connexion
  const login = (newToken, user) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
    setUserInfo(user);
  };

  // For the disconnection
  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setUserInfo(null);
  };

  // Update userInfo if token or addresses.length change
  useEffect(() => {
    if (token) {
      fetchDataUserGet(`${import.meta.env.VITE_BASE_API}/api/users/me`)
        .then(async (userInfo) => {
          setUserInfo(userInfo);
        })
        .catch((error) => console.error("Erreur lors du chargement", error));
    }
  }, [token, userInfo?.addresses.length]);

  // Export the context
  return (
    <AuthContext.Provider
      value={{ token, userInfo, login, logout, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
}
