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
