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
        rol: datosUser.data.rol,
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

  const agregarAFavoritos = async (producto) => {
    try {
      const nuevosFavoritos = [...(user.favoritos || []), producto.id]; // Solo agregamos el id
  
      await axios.patch(`http://localhost:3001/users/${user.id}`, {
        favoritos: nuevosFavoritos,
      });
  
      const updatedUser = { ...user, favoritos: nuevosFavoritos };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error al agregar a favoritos en la DB:", error);
    }
  };
  

  const eliminarDeFavoritos = async (productoId) => {
    try {
      const nuevosFavoritos = user.favoritos.filter((fav) => fav !== productoId); // Filtramos por id
      await axios.patch(`http://localhost:3001/users/${user.id}`, {
        favoritos: nuevosFavoritos,
      });
  
      const updatedUser = { ...user, favoritos: nuevosFavoritos };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error al eliminar de favoritos en la DB:", error);
    }
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData)); // Almacenar el usuario en localStorage
      localStorage.setItem("token", newUserData.id); // Almacenar el token
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
