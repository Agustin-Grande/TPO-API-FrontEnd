import axios from "axios";
import apiClient from "./apiClient";

export const serviceLogin = async (nombreUsuario, contrasena) => {  

    const obj = {email: nombreUsuario, password: contrasena};
    try {
        const response = await axios.post("http://localhost:8080/usuario/authenticate", obj);
        return response.data.access_token;
    } catch (error) {
        console.error("No se pudo iniciar sesión con el usuario que ingresó", error);
    }
};

