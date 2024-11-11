import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/productoDetalle.css';
import AuthContext from '../context/AuthContext.jsx';
import { useContext} from "react";



const ProductoDetalles_Gestor = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [editProduct, setEditProduct] = useState(producto);
  const {user} = useContext(AuthContext);



  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/productos/${id}`);
        setProducto(response.data);
        setEditProduct(response.data);
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
        ...editProduct,
        [name]: value
    });
};


const handleSave = async () => {
    try {
        const response = await axios.put(`http://localhost:3001/productos/${editProduct.id}`, editProduct);
        //onUpdate(response.data); 
    } catch (error) {
        console.error("Error updating product:", error);
    }
};

  return (
    <div>
    { user.rol != 'Admin' ? (
      <div>
     <p>No tienes acceso a editar productos</p>
     </div>
    ) : (
    <main>
      <div className="container-product-detail">
        <div className="product-image">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
        <div className="product-info">
          <h2 id="nombre_producto"><input type="text" name="nombre" value={editProduct.nombre} onChange={handleChange} /></h2>
          <p id="precio"><strong>Precio:</strong> <input type="number" name="precio" value={editProduct.precio} onChange={handleChange} /></p>
          <p><strong>Stock disponible:</strong> <span id="Stock"><input type="number" name="stock" value={editProduct.stock} onChange={handleChange} /></span> unidades</p>
          <p><strong>Liga:</strong> <span id="Stock"><input type="text" name="liga" value={editProduct.liga} onChange={handleChange} /></span> unidades</p>
          <p><strong>Equipo:</strong> <span id="Stock"><input type="text" name="equipo" value={editProduct.equipo} onChange={handleChange} /></span> unidades</p>
          <p><strong>Marca:</strong> <span id="Stock"><input type="text" name="marca" value={editProduct.marca} onChange={handleChange} /></span> unidades</p>

          <div className="product-description">
            <h4><a onClick={toggleDescripcion} style={{ cursor: 'pointer' }}>Ver descripción {mostrarDescripcion ? '↑' : '↓'}</a></h4>
            {mostrarDescripcion && (
              <p id="description"><textarea name="descripcion" value={editProduct.descripcion} onChange={handleChange}></textarea></p>
            )}
          </div>
          <button onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </main>
  )}
  </div>
  );

};

export default ProductoDetalles_Gestor;