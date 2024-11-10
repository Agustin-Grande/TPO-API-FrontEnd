import axios from "axios";
import apiClient from "./apiClient";


export const serviceLogin = async (nombreUsuario, contrasena) => {  
    const response = await apiClient.post("auth",{nombreUsuario, contrasena});
    const usuarios = await apiClient.get('users');
    const usuarioFiltrado = usuarios.data.filter(user => user.nombreUsuario === nombreUsuario);
    const usuarioCompleto = {
        ...response.data,
        ...usuarioFiltrado[0]
    };   
    return usuarioCompleto;
};

