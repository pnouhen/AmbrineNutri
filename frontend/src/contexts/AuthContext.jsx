import { createContext, useState, useEffect } from "react";
import { fetchDataUserGet } from "../services/fetchDataUserGet";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem("token");
  });
  
  const [userInfo, setUserInfo] = useState(() => {
    return JSON.parse(sessionStorage.getItem("userInfo"))
  });

  // For the connexion
  const login = (newToken, user) => {
    sessionStorage.setItem("userInfo", JSON.stringify(user))
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
    setUserInfo(user)
  };

  // For the disconnection
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userInfo")
    sessionStorage.removeItem("invoicesRecipes")
    setToken(null);
    setUserInfo(null)
  };

  // Export the context
  return (
    <AuthContext.Provider
      value={{ token, userInfo, login, logout, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
}
