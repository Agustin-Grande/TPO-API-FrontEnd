import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import "../styles/Home.css";
import Cuotas9 from '../assets/9cuotas.png'; 
import Cuotas6 from '../assets/6cuotas.png';
import envio from '../assets/enviogratis.png';
import retiro from '../assets/retiro.png';
import messi from '../assets/messi.jpg';
import imagen from '../assets/imagen.png';
import { mostrarFavUser } from '../services/serviceFav';
import { Link } from 'react-router-dom';
import { useVistos } from '../hooks/useVistos';

const Home = () => {
  const { vistos, agregarVisto } = useVistos(); 
  const { user } = useAuth();
  const [productosFavoritos, setProductosFavoritos] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 



  useEffect(() => {
    if (user?.favoritos?.length > 0) {
      const fetchFavoritos = async () => {
        try {
          const favoritos = await mostrarFavUser(user);  
          setProductosFavoritos(productosFavoritos);
          console.log('favoritos:', favoritos);
          console.log('Productos favoritos:', productosFavoritos);
        } catch (error) {
          setError('Error al obtener los productos favoritos.');  
          console.error('Error al obtener los productos favoritos:', error);
        } finally {
          setLoading(false);  
        }
      };

      fetchFavoritos();
    } else {
      setLoading(false);  
    }
  }, [user]);  

  return (
    <div>
      <div className="portada-home">
        <img src={messi} alt="Portada Messi" />
      </div>

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

      <div className="bienvenido-home">
        <img src={imagen} alt="Bienvenido" />
        <h1>Bienvenido, {user ? user.nombreUsuario : "invitado"}</h1>
      </div>

      <h2 className='tituloFav'>Productos Favoritos</h2>
      <div className="product-grid">
        {loading ? (
          <p>Cargando productos favoritos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : productosFavoritos?.length > 0 ? (
          <div className="product-grid">
            {productosFavoritos.map((productoArray) =>
              productoArray.map((producto) => (
                <div key={producto.id} className="producto">
                  <Link
                    to={`/producto/${producto.id}`}
                    onClick={() => agregarVisto(producto)} 
                  >
                    <img src={producto.imagen} alt={producto.nombre} />
                    <p className="producto-nombre">{producto.nombre}</p>
                  </Link>
                </div>
              ))
            )}
          </div>
        ) : (
          <p>Los productos marcados como Favorito se mostraran aquí</p>
        )}
      </div>

      <h2 className='tituloFav'>Productos Visitados</h2>
      <div className="product-grid">
        {vistos?.length > 0 ? (
          <div className="product-grid">
            {vistos.map((producto) => (
              <div key={producto.id} className="producto">
                <Link to={`/producto/${producto.id}`}>
                  <img src={producto.imagen} alt={producto.nombre} />
                  <p className="producto-nombre">{producto.nombre}</p>
                </Link>
              </div>
            ))}
          </div>
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
