import axios from "axios";
import apiClient from "./apiClient";


export const serviceLogin = async (nombreUsuario, contrasena) => {  
    const response = await apiClient.post("auth",{nombreUsuario, contrasena});
    return response.data; 

};

export const getUsuarios = async () => {
    const response = await apiClient.get('users');
    console.log(response.data);
    return response.data;
}
