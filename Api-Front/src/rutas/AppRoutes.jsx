import { Routes, Route } from 'react-router-dom';
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Carrito from '../pages/Carrito';
import GestorProd from '../pages/GestorProd';
import MiPerfil from '../pages/MiPerfil';

const AppRoutes = () => {
    //agregar header, nav y footer como fijo
    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/gestorProd" element={<GestorProd />} />
                    <Route path="/mi-perfil" element={<MiPerfil />} />
                </Routes>
            </div>
        </>
    );
};

export default AppRoutes;