import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { verItemsDeOrden, productoPorOrden } from '../../services/servicePerfil'; // Asegúrate de importar la función


const DetallesOrden = () => {
  const location = useLocation();
  const { orden } = location.state || {}; // Extrae el objeto de orden

  // Estado para almacenar los productos
  const [productos, setProductos] = useState([]);
  const [items, setItems] = useState([]);  // Estado para almacenar los items de la orden

  // Función para obtener los datos
  const traerDatos = async () => {
    if (orden) {
      const items = await verItemsDeOrden(orden);
      setItems(items);  // Guardamos los items en el estado
      const productos = await productoPorOrden(items);
      setProductos(productos);  // Guardamos los productos en el estado
    }
  };

  useEffect(() => {
    if (orden) {
      traerDatos();  // Llamamos a traerDatos solo cuando orden esté disponible
    }
  }, [orden]); // Dependencia de 'orden'

  // Verificamos si 'orden' está disponible antes de renderizar
  if (!orden) {
    return <p>No se encontraron detalles de la orden.</p>;
  }

  return (
    <div>
      <h1>Detalles de la Orden</h1>
      <p><strong>Fecha:</strong> {orden.fecha}</p>
      <p><strong>Costo Total:</strong> ${orden.precio_total}</p>
      <div>
        <h2>Productos</h2>
        <ul>
          {productos.map((producto, index) => (
            <li key={index}>
              <p><strong>Nombre:</strong> {producto.nombre}</p>
              <p><strong>Precio:</strong> ${producto.precio}</p>
              <p><strong>Cantidad:</strong> {items[index]?.cantidad}</p> {/* Verifica que el índice exista */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetallesOrden;
