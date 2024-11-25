import { createContext, useEffect, useState } from "react";
import { serviceLogin } from "../services/serviceLogin";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { useVistos } from '../hooks/useVistos';
import { getCliente } from "@/services/getCliente";
import apiClient from "../services/apiClient"


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { favoritos: [] };
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { limpiarVistos } = useVistos(); 

  
 

  const login = async (nombreUsuario, contrasena) => {
    try {
      const token = await serviceLogin(nombreUsuario, contrasena);
      localStorage.setItem("token", token);
      const datosUser = await apiClient.get("/usuario/getUser");
      console.log("Datos del usuario logueado:", datosUser.data.nombreUsuario);

      const userData = {
        id: datosUser.data.id,
        nombreUsuario: datosUser.data.nombreUsuario,
        mail: datosUser.data.mail,
        nombre: datosUser.data.nombre,
        apellido: datosUser.data.apellido,
        favoritos: datosUser.data.favoritos || [],
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      limpiarVistos();
      navigate("/home");
    } catch (error) {
      console.error("Error durante el login:", error);
      setError("Usuario o contraseña incorrectos");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear("");
    limpiarVistos();
    navigate("/login");
  };

  

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData)); 
    localStorage.setItem("nombre", JSON.stringify(newUserData.nombre));
    localStorage.setItem("apellido", newUserData.apellido);
    localStorage.setItem("mail", newUserData.mail);
    localStorage.setItem("rol", newUserData.rol);
};


  

  useEffect(() => {
    setError(null);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, error, updateUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
