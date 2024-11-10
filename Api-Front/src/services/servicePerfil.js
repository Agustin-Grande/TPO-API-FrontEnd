import axios from "axios";
import apiClient from "./apiClient";

export const verOrdenesPorUsuario = async (usuarioId) => {  
    const response = await axios.get("http://localhost:3001/Orden");

    // Filtra usando `user_id` en lugar de `usuarioId`
    const ordenes = response.data.filter(orden => orden.user_id === usuarioId);
    return ordenes; 
};

