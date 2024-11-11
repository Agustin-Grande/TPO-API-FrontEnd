import { createContext, useEffect, useState } from "react";
import { serviceLogin } from "../services/serviceLogin";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Asegúrate de tener axios importado

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { favoritos: [] };
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (nombreUsuario, contrasena) => {
    try {
      const response = await serviceLogin(nombreUsuario, contrasena);
      setUser({ ...response, favoritos: response.favoritos || [] });
      localStorage.setItem("user", JSON.stringify({ ...response, favoritos: response.favoritos || [] }));
      localStorage.setItem("token", response.id);
      navigate("/home");
    } catch (error) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
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
  

  useEffect(() => {
    setError(null);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, error, agregarAFavoritos, eliminarDeFavoritos }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
