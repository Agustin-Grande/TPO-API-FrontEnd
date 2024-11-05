import React, { useState, useEffect } from 'react';
import { getUsuarios } from '../services/serviceLogin'; 
import "../styles/cardMP.css";
import tarjetaCompra from '../componentes/Perfil/tarjetaCompra';
const MiPerfil = () => {
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        const inicio = async () => {
            try {
                const users = await getUsuarios(); 
                setUserProfile(users);
            } catch (error) {
                console.log("ERROR");
            }
        };
        inicio();
    }, []);

    return (
        <div>
            <h1>Mi Perfil</h1>
            {userProfile?.map((user) => (
                <div key={user.id}>
                    <p>Nombre: {user.nombre}</p>
                    <p>Apellido: {user.apellido}</p>
                    <p>Email: {user.email}</p>
                    <p>Compras: </p>
                    {user.compras.map((compra, index) => (
                        tarjetaCompra(index, compra)
                    ))}
                </div>
            ))}
        </div>
    );
    
};
export default MiPerfil;
