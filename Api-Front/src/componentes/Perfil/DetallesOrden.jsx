import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { verItemsDeOrden, productoPorOrden } from '../../services/servicePerfil'; // Asegúrate de importar la función
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';


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
    <div className="container flex flex-col items-center justify-center h-full">
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Detalles de la Orden</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p><strong>Fecha:</strong> {orden.fecha}</p>
          <p><strong>Costo Total:</strong> ${orden.precio_total}</p>
        </CardDescription>
        <Separator className="my-6" />
        <div>
          <h2 className="text-lg font-medium mb-4">Productos</h2>
          <div className="space-y-4">
            {productos.map((producto, index) => (
              <div key={index} className="border border-gray-300 rounded-md p-4">
                <div className="flex items-center space-x-4">
                  <img src={producto.imagen} alt="" className="w-20 h-20 rounded" />
                  <div>
                    <p><strong>Nombre:</strong> {producto.nombre}</p>
                    <p><strong>Descripción:</strong> {producto.descripcion}</p>
                    <p><strong>Precio:</strong> ${producto.precio}</p>
                    <p><strong>Cantidad:</strong> {items[index]?.cantidad}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  );
};

export default DetallesOrden;
