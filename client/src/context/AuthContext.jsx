import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated") === "true";
    const storedRole = localStorage.getItem("role") || "";

    setIsAuthenticated(storedAuthStatus);
    setRole(storedRole);
  }, []);

  const login = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("role", userRole);

    // Navigate based on role after login
    if (userRole === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");

    navigate("/login"); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
