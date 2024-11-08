import axios from "axios";
import apiClient from "./apiClient";


export const serviceLogin = async (nombreUsuario, contrasena) => {  
    const response = await apiClient.post("auth",{nombreUsuario, contrasena});
    return response.data; 

};
