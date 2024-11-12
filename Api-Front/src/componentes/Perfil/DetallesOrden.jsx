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
      <CardHeader className="sticky top-0 bg-background z-10">
        <CardTitle>Detalles de la Orden</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="sticky top-[72px] bg-background z-10 pb-4">
          <p><strong>Fecha:</strong> {orden.fecha}</p>
          <p><strong>Costo Total:</strong> ${orden.precio_total}</p>
        </CardDescription>
        <Separator className="my-6" />
        <div>
          <h2 className="text-lg font-medium mb-4 sticky top-[160px] bg-background z-10">Productos</h2>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {productos.map((producto, index) => (
              <div 
                key={index} 
                className="border border-gray-300 rounded-md p-4 bg-background hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre} 
                    className="w-20 h-20 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <p className="font-medium text-lg mb-1">{producto.nombre}</p>
                    <p className="text-sm text-muted-foreground mb-2">{producto.descripcion}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm"><strong>Precio:</strong> ${producto.precio}</p>
                      <p className="text-sm"><strong>Cantidad:</strong> {items[index]?.cantidad}</p>
                    </div>
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
