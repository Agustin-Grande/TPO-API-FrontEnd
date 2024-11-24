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


export const agregarAFav = async (producto, user, setUser) => {
  try {
    await apiClient.post(`/usuario/agregar_fav`, producto);
    // Actualiza el estado del usuario con los nuevos favoritos
    setUser((prevUser) => ({
      ...prevUser,
      favoritos: [...prevUser.favoritos, producto],
    }));
  } catch (error) {
    console.error("Error al agregar a favoritos en la DB:", error);
    throw error; // Opcional, para manejar errores en el componente que lo llama
  }
};




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

