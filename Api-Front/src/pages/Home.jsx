import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/Home.css";
import Cuotas9 from "../assets/9cuotas.png";
import Cuotas6 from "../assets/6cuotas.png";
import envio from "../assets/enviogratis.png";
import retiro from "../assets/retiro.png";
import messi from "../assets/messi.jpg";
import imagen from "../assets/imagen.png";
import { mostrarFavUser } from "../services/serviceFav";
import { Link } from "react-router-dom";
import { useVistos } from "../hooks/useVistos";
import foto from "../assets/fullAdidasAFA50.jpg";

const Home = () => {
  const { vistos, agregarVisto } = useVistos();
  const { user } = useAuth();
  const [productosFavoritos, setProductosFavoritos] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        setLoading(true);
        if (!user) {
          setError("Por favor, inicia sesión para ver tus favoritos.");
          setLoading(false);
          return;
        }
        const favoritos = await mostrarFavUser();
        setProductosFavoritos(favoritos);
      } catch (error) {
        setError("Error al obtener los productos favoritos. Inténtalo más tarde.");
        setProductosFavoritos([]); // Limpia la lista en caso de error
      } finally {
        setLoading(false);
      }
    };
  
    fetchFavoritos();
  }, [user]);
  
  

  return (
    <div>
      {/* Portada */}
      <div className="portada-home">
        <img src={foto} alt="Portada Messi" />
      </div>

      {/* Cuadrados promocionales */}
      <div className="contenedor-home">
        <div className="cuadrado-home">
          <img src={Cuotas9} alt="9 Cuotas" />
        </div>
        <div className="cuadrado-home">
          <img src={Cuotas6} alt="6 Cuotas" />
        </div>
        <div className="cuadrado-home">
          <img src={envio} alt="Envío Gratis" />
        </div>
        <div className="cuadrado-home">
          <img src={retiro} alt="Retiro en tienda" />
        </div>
      </div>

      {/* Bienvenida */}
      <div className="bienvenido-home">
        <img src={imagen} alt="Bienvenido" />
        <h1>Bienvenido, {user ? user.nombreUsuario : "invitado"}</h1>
      </div>

      {/* Productos favoritos */}
      <h2 className="tituloFav">Productos Favoritos</h2>
      <div className="product-grid">
        {loading ? (
          <p>Cargando productos favoritos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : productosFavoritos.length > 0 ? (
          productosFavoritos.map((producto) => (
            <div key={producto.id} className="producto">
              <Link
                to={`/catalogo/productos/${producto.id}`}
                onClick={() => agregarVisto(producto)}
              >
                <img src={producto.imagen} alt={producto.nombre} />
                <p className="producto-nombre">{producto.nombre}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Los productos marcados como favoritos se mostrarán aquí.</p>
        )}
      </div>

      {/* Productos visitados */}
      <h2 className="tituloFav">Productos Visitados</h2>
      <div className="product-grid">
        {vistos?.length > 0 ? (
          vistos.map((producto) => (
            <div key={producto.id} className="producto">
              <Link to={`/catalogo/productos/${producto.id}`}>
                <img src={producto.imagen} alt={producto.nombre} />
                <p className="producto-nombre">{producto.nombre}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No has visitado ningún producto aún.</p>
        )}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Home;
