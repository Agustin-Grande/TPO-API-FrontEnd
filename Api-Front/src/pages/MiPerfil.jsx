import React, { useState, useEffect } from 'react';
import { getUsuarios } from '../services/serviceLogin'; // Asegúrate de importar correctamente
import "../styles/cardMP.css";
const MiPerfil = () => {
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        const inicio = async () => {
            try {
                const users = await getUsuarios(); // Cambiado a getUsuarios
                setUserProfile(users);
            } catch (error) {
                console.log("ERRORERRORERRORERRORERRORERRORERRORERRORERRORERROR");
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
                    {user.compras?.map((compra, index) => (
                        <div key={index} id="tarjeta" className="card mb-3" style={{maxWidth: '540px'}}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={compra.imagen} className="img-fluid rounded-start" alt="..." />
                                </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                <h5 className="card-title">Compra del {compra.fecha}</h5>
                                <p className="card-text">Cantidad de productos comprados: {compra.cantidad} <br /> Costo final: {compra.precio * compra.cantidad}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            ))}
        </div>
    );
    
};
export default MiPerfil;
