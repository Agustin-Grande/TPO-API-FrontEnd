import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/productoDetalle.css';

const ProductoDetalles = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/productos/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      }
    };
    fetchProducto();
  }, [id]);

  if (!producto) {
    return <p>Cargando producto...</p>;
  }

  const toggleDescripcion = () => {
    setMostrarDescripcion(!mostrarDescripcion);
  };

  return (
    <main>
      <div className="container-product-detail">
        <div className="product-image">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
        <div className="product-info">
          <h2 id="nombre_producto">{producto.nombre}</h2>
          <p id="precio"><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>Stock disponible:</strong> <span id="Stock">{producto.stock}</span> unidades</p>
          
          <form>
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
            <br />
            <br />
            <button type="button" className="btn-primary">Comprar</button>
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