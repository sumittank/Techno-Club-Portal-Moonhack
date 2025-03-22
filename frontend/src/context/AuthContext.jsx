import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem("logintype"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));

  useEffect(() => {
    const updateAuth = () => {
      setUserRole(localStorage.getItem("logintype"));
      setIsAuthenticated(!!localStorage.getItem("authToken"));
    };
    window.addEventListener("storage", updateAuth);
    return () => window.removeEventListener("storage", updateAuth);
  }, []);

  const login = (token, role,email) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("logintype", role);
    localStorage.setItem("email", email);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("logintype");
    localStorage.removeItem("email");
    setUserRole(null);
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
