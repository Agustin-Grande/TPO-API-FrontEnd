import { Routes, Route } from 'react-router-dom';
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Carrito from '../pages/Carrito';
import GestorProd from '../pages/GestorProd';
import Home from '../pages/Home';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Catalogo from '../pages/Catalogo';

const AppRoutes = () => {
    //agregar header, nav y footer como fijo
    return (
        <>
            <Header />
            <div>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/gestorProd" element={<GestorProd />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default AppRoutes;