import apiClient from "./apiClient";
import axios from "axios";

export const handleRegister = async (newUser) => {
    try {
        const transformedUser = {
            userName: newUser.nombreUsuario, 
            firstname: newUser.nombre, 
            lastname: newUser.apellido, 
            fechaNacimiento: newUser.fechaNacimiento,
            email: newUser.email, 
            password: newUser.contrasena 
        };

        const response = await axios.post("http://localhost:8080/usuario/registro", transformedUser);
        console.log(response.access_token);

        if (response.data && response.data.access_token) {
            console.log("entro");
            return { success: true, message: "Registro exitoso", access_token: response.data.access_token };
        } else {
            return { success: false, message: 'Error al registrar usuario' };
        }
    } catch (error) {
        console.error("Error en la conexión con el servidor:", error);
        return { success: false, message: 'Error de conexión con el servidor' };
    }
};
