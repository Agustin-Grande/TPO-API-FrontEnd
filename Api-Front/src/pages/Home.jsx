import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import "../styles/Home.css";
import Cuotas9 from '../assets/9cuotas.png'; // Asegúrate de que la ruta sea correcta
import Cuotas6 from '../assets/6cuotas.png';
import envio from '../assets/enviogratis.png';
import retiro from '../assets/retiro.png';
import messi from '../assets/messi.jpg';
import imagen from '../assets/imagen.png';
import { mostrarFavUser } from '../services/serviceFav';
import { Link } from 'react-router-dom';


const Home = () => {
  const { user } = useAuth();
  const [productosFavoritos, setProductosFavoritos] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    if (user && user.favoritos.length > 0) {
      const fetchFavoritos = async () => {
        try {
          const productos = await mostrarFavUser(user);  
          setProductosFavoritos(productos);  
          console.log(productos[0][0].id)
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
        <img src={messi} alt="" />
      </div>

      <div className="contenedor-home">
        <div className="cuadrado-home">
          <img src={Cuotas9} alt="Cuotas" />  
        </div>
        <div className="cuadrado-home">
          <img src={Cuotas6} alt="Cuotas" />  
        </div>
        <div className="cuadrado-home">
          <img src={envio} alt="Cuotas" />
        </div>
        <div className="cuadrado-home">
          <img src={retiro} alt="Cuotas" />
        </div>
      </div>

      <div className="bienvenido-home">
        <img src={imagen} alt="Cuotas" />
        <h1>Bienvenido, {user ? user.nombreUsuario : "invitado"}</h1>
      </div>

      <h2 className='tituloFav'>Productos Favoritos</h2>

      <div className="productos-favoritos">
        {loading ? (
          <p>Cargando productos favoritos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : productosFavoritos.length > 0 ? (
          <div className="productos-lista">
            {productosFavoritos.map((productoArray, index) => (
              productoArray.map((producto) => (
                <div key={producto.id} className="producto">
                  <Link to={`/producto/${producto.id}`}>
                    <img src={producto.imagen} alt={producto.nombre} />
                    <p className="producto-nombre">{producto.nombre}</p>
                  </Link>
                </div>
              ))
            ))}
          </div>
        ) : (
          <p>Los productos marcados como Favorito se mostraran aca</p>
          
        )}
      </div>

    </div>
  );
};

export default Home;
