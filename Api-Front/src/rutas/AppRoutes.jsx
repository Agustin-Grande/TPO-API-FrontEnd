import { Routes, Route } from 'react-router-dom';
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
import ProductoDetalles from '../pages/ProductoDetalles';
import ProductoDetalles_Gestor from '../pages/ProductoDetalles-Gestor';

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
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/producto/:id" element={<ProductoDetalles />} />
                    <Route path="/productoEdit/:id" element={<ProductoDetalles_Gestor />} />
                    <Route path="/mi-perfil" element={<MiPerfil />} />
                    <Route path="/detalles-orden" element={<DetallesOrden />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default AppRoutes;