import axios from "axios";
import apiClient from "./apiClient";

export const verOrdenesPorUsuario = async (usuarioId) => {  
    const response = await apiClient.get("orden");
    return response.data; 
};

export const productoPorOrden = async (orden) => {
    console.log("orden:", orden.id);
    const response = await apiClient.get(`Productos/management/orden/${orden.id}`);
    return response.data;
};

export const editarDatosPersonales = async (datosNuevos) => {
    try {
        const response = await apiClient.put(`/mi-perfil/editar_datos`, datosNuevos);
        return true;
    } catch (error) {
        if (error.response && error.response.data) {
            const errorMessage = error.response.data || 'Error desconocido del servidor';
            alert(`Error! ${errorMessage}`); 
        } else {
            alert(`Error inesperado: ${error.message}`);
        }
        console.error("Error en editarDatosPersonales:", error.response?.data || error.message);
        return false;
    }
};

