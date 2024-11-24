import axios from "axios";
import apiClient from "./apiClient";

export const mostrarFavUser = async (user) => {
  try {
    if (user.favoritos.length === 0) {
      return [];
    }

    // const productosFavoritos = [];

    // for (let i = 0; i < user.favoritos.length; i++) {
    //   const productoId = user.favoritos[i];
    //   const response = await apiClient.get('Productos', {
    //     params: { id: productoId }
    //   });
    //   productosFavoritos.push(response.data); 
    // }
    return user.favoritos;
  } catch (err) {
    console.error("Error al obtener los productos favoritos", err);
    throw err;
  }
};

export const agregarAFav = async (producto, user) => {
  console.log(producto);
  console.log(user);
  try {
    const nuevosFavoritos = [...(user.favoritos || []), producto.id]; 
    await apiClient.post(`/usuario/agregar_fav`, {
      favoritos: nuevosFavoritos[-1],
    });

    const updatedUser = { ...user, favoritos: nuevosFavoritos };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Error al agregar a favoritos en la DB:", error);
  }
}

export const eliminarDeFav = async (productoId, user) => {
  try {
    const nuevosFavoritos = user.favoritos.filter((fav) => fav !== productoId); 

    await apiClient.put(`/usuario/eliminar_fav`, {
      favoritos: nuevosFavoritos,
    });

    const updatedUser = { ...user, favoritos: nuevosFavoritos };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Error al eliminar de favoritos en la DB:", error);
  }
}

