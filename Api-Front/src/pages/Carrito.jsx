import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import axios from 'axios';
import ItemCarrito from '../componentes/Carrito/ItemCarrito.jsx';
import ControlesCarrito from '../componentes/Carrito/ControlesCarrito.jsx';
import {checkout} from '../services/serviceCheckout.js'


import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2, ShoppingCart } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import {agregarItemsCarrito, obtenerCarrito, actualizarPrecioTotal} from '../services/serviceCart.js';


const Carrito = () => {
  const [carrito, setCarrito] = useState(null);
  const [itemsCarrito, setItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCarrito = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/carrito?user_id=${user.id}`);
        cargarItems(res.data[0].id);
        setCarrito(res.data[0]);
      } catch (err) {
        console.error("Carrito vacío");
      }
    };
    fetchCarrito();
  }, []);

  const cargarItems = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/carrito_item?carrito_id=${id}`);
      const itemsWithDetails = await Promise.all(
        res.data.map(async (item) => {
          const productRes = await axios.get(`http://localhost:3001/productos?id=${item.product_id}`);
          return {
            ...item,
            nombre: productRes.data[0].nombre,
            imagen: productRes.data[0].imagen || '/api/placeholder/80/80' // Fallback to placeholder if no image
          };
        })
      );
      setItems(itemsWithDetails);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotal = () => {
    return itemsCarrito.reduce((total, item) => total + item.precioTotal, 0);
  };

  const EmptyCart = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
      <p className="text-sm text-gray-500">¡Agrega algunos productos para empezar!</p>
    </div>
  );

  const eliminarItem = async (itemId) => {        
    try {
        await axios.delete(`http://localhost:3001/carrito_item/${itemId}`);
        //let nuevoarreglo =  itemsCarrito.filter(item => item.id !== itemId)            
        cargarItems(carrito.id)
    } catch (err) {
        console.error("Error eliminando item del carrito");
    }
};

const sumarCantidad = async (item, producto) =>{
    if(item.cantidad < producto.stock){
        let carrito = await obtenerCarrito(user)
        await agregarItemsCarrito(carrito.id, producto)
        await actualizarPrecioTotal(carrito)
    }

    cargarItems(carrito.id)
}

const restarCantidad = async (item, producto) =>{        
    if(item.cantidad > 1){
        let carrito = await obtenerCarrito(user)
        await agregarItemsCarrito(carrito.id, producto, -1)
        await actualizarPrecioTotal(carrito)
    }

    cargarItems(carrito.id)
};

const vaciarCarrito = async () =>{
  try {
      let items = await obtenerItemsCarrito(carrito.id);
      for (const item of items) {
          await axios.delete(`http://localhost:3001/carrito_item/${item.id}`);
      }

      await axios.patch(`http://localhost:3001/carrito/${carrito.id}`, {
          precioTotal: 0
      });
      setItems([]);
  } catch (error) {
      console.error("Error al vaciar carrito:", error);
  }
};

const obtenerItemsCarrito = async (carritoId) => {
  try {
      const response = await axios.get(`http://localhost:3001/carrito_item?carrito_id=${carritoId}`);
      return response.data;
  } catch (error) {
      console.error("Error al obtener items del carrito:", error);
  }
};

const confirmarCarrito = async() =>{
  await checkout(carrito.id)
  vaciarCarrito()
}


  return (
    <div >
    <Card className="w-full max-w-4xl mx-auto" >
      <CardHeader>
        <CardTitle className="text-2xl">Carrito de Compras</CardTitle>
      </CardHeader>
      
      <CardContent>
        {itemsCarrito.length > 0 ? (
          <ScrollArea className="h-[400px] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Imagen</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Precio Unit.</TableHead>
                  <TableHead className="text-center">Cantidad</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itemsCarrito.map((item,index) => (
                  <ItemCarrito key={index} item={item} eliminarItem={eliminarItem} sumar={sumarCantidad} restar={restarCantidad}/>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <EmptyCart />
        )}
      </CardContent>

      {itemsCarrito.length > 0 && (
         <CardFooter className="flex flex-col gap-4">
         <Separator />
         <div className="flex justify-between items-center w-full">
           <div className="flex gap-4">
             <Button
               variant="destructive"
               onClick={vaciarCarrito}
             >
               Vaciar Carrito
             </Button>
           </div>
           <div className="text-right">
             <p className="text-sm text-gray-500">Total</p>
             <p className="text-2xl font-bold">${calculateTotal().toFixed(2)}</p>
           </div>
         </div>
         <Button className="w-full" size="lg" onClick={confirmarCarrito}>
           Confirmar Carrito
         </Button>
       </CardFooter>
         
      )}
    </Card>
    </div>
  );
};

export default Carrito;