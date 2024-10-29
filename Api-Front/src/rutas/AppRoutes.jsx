import { Routes, Route } from 'react-router-dom';
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Carrito from '../pages/Carrito';
import GestorProd from '../pages/GestorProd';

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
                </Routes>
            </div>
        </>
    );
};

export default AppRoutes;