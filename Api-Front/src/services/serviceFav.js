import axios from "axios";
import apiClient from "./apiClient";

export const mostrarFavUser = async (user) => {
  try {
    if (user.favoritos.length === 0) {
      return [];
    }

    const productosFavoritos = [];

    for (let i = 0; i < user.favoritos.length; i++) {
      const productoId = user.favoritos[i];
      const response = await apiClient.get('productos', {
        params: { id: productoId }
      });
      productosFavoritos.push(response.data); 
    }

    console.log(productosFavoritos);
    return productosFavoritos;
  } catch (err) {
    console.error("Error al obtener los productos favoritos", err);
    throw err;
  }
};
