import axios from "axios";
import apiClient from "./apiClient";

export const getCliente = async () => {  
    try {
        const response = await apiClient.get('/usuario/getUser');
        console.log(response.data);   
    } catch (error) {
        console.error("No se pudo iniciar sesión con el usuario que ingresó", error);
    }
};