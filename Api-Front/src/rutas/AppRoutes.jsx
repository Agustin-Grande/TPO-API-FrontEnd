import { Routes, Route, useLocation } from 'react-router-dom';
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Carrito from '../pages/Carrito';
import GestorProd from '../pages/GestorProd';
import Home from '../pages/Home';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Catalogo from '../pages/Catalogo';
import MiPerfil from '../pages/MiPerfil';
import DetallesOrden from '../componentes/Perfil/DetallesOrden';

const AppRoutes = () => {
    const location = useLocation();
    
    // Define las rutas donde no deseas mostrar Header y Footer
    const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/registro";

    return (
        <>
            {/* Renderiza Header solo si no estamos en /login o /registro */}
            {!hideHeaderFooter && <Header />}
            <div>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/gestorProd" element={<GestorProd />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/mi-perfil" element={<MiPerfil />} />
                    <Route path="/detalles-orden" element={<DetallesOrden />} />
                </Routes>
            </div>
            {/* Renderiza Footer solo si no estamos en /login o /registro */}
            {!hideHeaderFooter && <Footer />}
        </>
    );
};

export default AppRoutes;
