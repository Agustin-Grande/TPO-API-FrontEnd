import "../styles/MiPerfil.css";
import { useEffect, useState } from 'react';
import { verOrdenesPorUsuario } from '../services/servicePerfil';
import TarjetaCompra from '../componentes/Perfil/TarjetaCompra';
import { useAuth } from '../hooks/useAuth';
import DatosPersonales from "../componentes/Perfil/DatosPersonales";


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
        <div className="container mt-4" style={{display:"flex", flexDirection:"column", gap:"20px"}} >
            <div>
                <DatosPersonales user={user} />
            </div>
                <p><strong>Historial de compras</strong></p>
            <div className="overflow-auto" style={{height:"270px"}}>
                <TarjetaCompra ordenes={ordenes} />
                <br />
            </div>
        </div>
    );
};

export default MiPerfil;
