import { createContext, useEffect, useState } from "react";
import { serviceLogin } from "../services/serviceLogin";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return JSON.parse(savedUser) ?? null;
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (nombreUsuario, contrasena) => {
    try {
      const response = await serviceLogin(nombreUsuario, contrasena);
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response)); // Almacenar el usuario en localStorage
      localStorage.setItem("token", response.id); // Almacenar el token
      navigate("/home");
    } catch (error) {
      setError("Usuario o contraseña incorrectos"); // Mensaje de error
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    setError(null);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
