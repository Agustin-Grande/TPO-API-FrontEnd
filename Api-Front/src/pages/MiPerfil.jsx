import "../styles/cardMP.css";
import { useEffect, useState } from 'react';
import { verOrdenesPorUsuario } from '../services/servicePerfil';
import TarjetaCompra from '../componentes/Perfil/TarjetaCompra';
import { useAuth } from '../hooks/useAuth';

const MiPerfil = () => {
    const { user } = useAuth();
    
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        if (user) {
            const fetchOrdenes = async () => {
                try {
                    const response = await verOrdenesPorUsuario(user.id);
                    setOrdenes(Array.isArray(response) ? response : []);
                } catch (error) {
                    console.error("Error con las ordenes:", error);
                    setOrdenes([]); 
                }
            };
            fetchOrdenes();
        }
    }, [user]);
    

    if (!user) return <p>Cargando...</p>;

    return (
        <div>
            <h1>Mi Perfil</h1>
            <div>
                <p>Nombre: {user.nombre}</p>
                <p>Apellido: {user.apellido}</p>
                <p>Email: {user.email}</p>
                <p>Compras: </p>
                <div>
                    <TarjetaCompra ordenes={ordenes} />
                </div>
            </div>
        </div>
    );
};

export default MiPerfil;
