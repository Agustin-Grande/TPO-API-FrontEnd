import axios from "axios";
import apiClient from "./apiClient";

export const handleLog = async (newUser) => {  
    const response = await apiClient.get('users', {  
        params: {
            nombreUsuario: newUser.nombreUsuario,
            contrasena: newUser.contrasena
        }
    });
    return response.data; 
};

export const getUsuarios = async () => {
    const response = await apiClient.get('users');
    console.log(response.data);
    return response.data;
}
