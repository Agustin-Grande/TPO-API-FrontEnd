import apiClient from "./apiClient";

export const handleRegister = async (newUser) => {
    try {
        // Verificación de nombre de usuario
        const responseNombre = await apiClient.get('users', {
            params: {
                nombreUsuario: newUser.nombreUsuario,
            }
        });

        if (responseNombre.data.length > 0) {
            return { success: false, message: 'El nombre de usuario ya está en uso' };
        }

        const responseMail = await apiClient.get('users', {
            params: {
                email: newUser.email,
            }
        });

        if (responseMail.data.length > 0) {
            return { success: false, message: 'El correo electrónico ya está en uso' };
        }


        const registro = await apiClient.post('users', newUser);

        return { success: true};
    } catch (error) {
        console.error("Error en la conexión con el servidor:", error);
        return { success: false, message: 'Error de conexión con el servidor' };
    }
};

//if (registro.status === 201) {
//    return { success: true, message: 'Registro exitoso' };
//} else {
//    return { success: false, message: 'Error al registrar el usuario' };
//}