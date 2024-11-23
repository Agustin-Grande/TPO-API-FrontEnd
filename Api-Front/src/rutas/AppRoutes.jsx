import { Routes, Route, useLocation } from 'react-router-dom';
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Carrito from '../pages/Carrito';
import Home from '../pages/Home';
import Header from '../componentes/Header';
import Footer from '../componentes/Footer';
import Catalogo from '../pages/Catalogo';
import MiPerfil from '../pages/MiPerfil';
import DetallesOrden from '../componentes/Perfil/DetallesOrden';
import ProductoDetalles from '../pages/ProductoDetalles';
import ProductoDetalles_Gestor from '../pages/ProductoDetalles-Gestor';
import FormProducto from '../pages/FormProducto';


const AppRoutes = () => {
    const location = useLocation();
    
    // Define las rutas donde no deseas mostrar Header y Footer
   

    return (
        <>  
            
            { <Header />}
            <div>
                <Routes>                    
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/carrito" element={<Carrito />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/catalogo/productos/:id" element={<ProductoDetalles />} />
                    <Route path="/productoEdit/:id" element={<ProductoDetalles_Gestor />} />
                    <Route path="/mi-perfil" element={<MiPerfil />} />
                    <Route path="/detalles-orden" element={<DetallesOrden />} />
                    <Route path="/crearProd" element={<FormProducto />} />

                </Routes>
            </div>
            {<Footer />}
        </>
    );
};

export default AppRoutes;
