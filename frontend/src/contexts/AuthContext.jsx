import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Au montage, récupère le token en sessionStorage
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

  return (
    <AuthContext.Provider value={{ token, userInfo, login, logout, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
}
