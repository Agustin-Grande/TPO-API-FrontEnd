import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import axios from 'axios';
import ItemCarrito from '../componentes/Carrito/ItemCarrito.jsx';
import { checkout } from '../services/serviceCheckout.js'
import apiClient from "../services/apiClient";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { agregarItemsCarrito } from '../services/serviceCart.js';
import CarritoVacio from '@/componentes/Carrito/CarritoVacio.jsx';


const Carrito = () => {
  const [carrito, setCarrito] = useState(null);
  const [itemsCarrito, setItems] = useState([]);

  useEffect(() => {
    fetchCarrito();
  }, []);

  const fetchCarrito = async () => {
    try {
      const res = await apiClient.get(`carrito`);        
      setCarrito(res.data);        
      setItems(res.data.items)        
    } catch (err) {
      console.error("Carrito vacío");
    }
  };

  const calculateTotal = () => {
    return itemsCarrito.reduce((total, item) => total + item.precioTotal, 0);
  };

  const eliminarItem = async (productId) => {
    try {
      await apiClient.delete(`carrito/eliminar/${productId}`)        
      fetchCarrito()
    } catch (err) {
      console.error("Error eliminando item del carrito");
    }
  };

  const sumarCantidad = async (itemCarrito) => {    
    if (itemCarrito.cantidad < itemCarrito.producto.stock) {
      await agregarItemsCarrito(itemCarrito.producto)
    }
    fetchCarrito()
  }

  const restarCantidad = async (itemCarrito) => {
    if (itemCarrito.cantidad > 1) {
      await agregarItemsCarrito(itemCarrito.producto, -1)
    }
    fetchCarrito()
  };

  const vaciarCarrito = async () => {
    try {
      await apiClient.delete('carrito/vaciar')
      setItems([]);
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
    }
  };

  const confirmarCarrito = async () => {
    await checkout()
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
                  {itemsCarrito.map((item, index) => (
                    <ItemCarrito key={index} item={item} eliminarItem={eliminarItem} sumar={sumarCantidad} restar={restarCantidad} />
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <CarritoVacio />
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