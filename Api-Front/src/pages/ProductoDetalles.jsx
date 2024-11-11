import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import corazonVacio from '../assets/corazon_vacio.png';
import corazonLleno from '../assets/corazon_lleno.png';
import '../styles/ProductoDetalle.css';

const ProductoDetalles = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/productos/${id}`);
        setProducto(response.data);
        setFavorito(response.data.favorito || false); // Estado inicial de favorito
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      }
    };
    fetchProducto();
  }, [id]);

  const toggleDescripcion = () => {
    setMostrarDescripcion(!mostrarDescripcion);
  };

  const handleFavoritoClick = async () => {
    const nuevoEstadoFavorito = !favorito;
    setFavorito(nuevoEstadoFavorito);

    try {
      await axios.patch(`http://localhost:3001/productos/${id}`, {
        favorito: nuevoEstadoFavorito,
      });
    } catch (error) {
      console.error('Error al actualizar el estado de favorito:', error);
    }
  };

  if (!producto) {
    return <p>Cargando producto...</p>;
  }

  return (
    <main>
      <div className="container-product-detail">
        <div className="product-image">
          <Link to="/"><img src={producto.imagen} alt={producto.nombre} /></Link>
        </div>
        <div className="product-info">
          <h2 id="nombre_producto">{producto.nombre}</h2>
          <p id="precio"><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>Stock disponible:</strong> <span id="Stock">{producto.stock}</span> unidades</p>
          
          <form className="product-actions">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              name="quantity"
              min="1"
              max={producto.stock}
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            <div className="action-buttons">
              <Link to="/formulario">
                <button type="button" className="btn-primary">Comprar</button>
              </Link>
              <button
                type="button"
                className="favorite-btn"
                onClick={handleFavoritoClick}
                aria-label="Agregar a favoritos"
              >
                <img
                  src={favorito ? corazonLleno : corazonVacio}
                  alt="Favorito"
                  className="corazon-icon"
                />
              </button>
            </div>
          </form>
          
          <div className="product-description">
            <h4><a onClick={toggleDescripcion} style={{ cursor: 'pointer' }}>Ver descripción {mostrarDescripcion ? '↑' : '↓'}</a></h4>
            {mostrarDescripcion && (
              <p id="description">{producto.descripcion}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductoDetalles;