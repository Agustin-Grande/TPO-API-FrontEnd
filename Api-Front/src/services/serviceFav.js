import axios from "axios";
import apiClient from "./apiClient";

/*export const mostrarFavUser = async (user) => {
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
};*/

export const mostrarFavUser = async () => {
  try {
    const response = await apiClient.get('/usuario/listaFavoritos'); // Asegúrate de usar await
    return response.data; // Asegúrate de devolver los datos, no toda la respuesta
  } catch (error) {
    console.error("Error al obtener la lista de favoritos:", error);
    throw error;
  }
};


export const agregarAFav = async (producto) => {
  try {
    const response = await apiClient.post('/usuario/agregar_fav', producto); // Enviamos el objeto completo
    return response.data; // Devuelve el estado actualizado desde el backend si es necesario
  } catch (error) {
    console.error("Error al agregar producto a favoritos:", error);
    throw error;
  }
};





export const eliminarDeFav = async (productoId) => {
  try {
    const response = await apiClient.delete(`/usuario/eliminarFavorito/${productoId}`);
    return response.data; // Devuelve el estado actualizado del servidor si es necesario
  } catch (error) {
    console.error("Error al eliminar producto de favoritos:", error);
    throw error;
  }
};
