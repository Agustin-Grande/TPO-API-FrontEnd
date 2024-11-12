import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import axios from 'axios';
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

  const handleVaciarCarrito = () => {
    setItems([]);
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

  const ProductImage = ({ src, alt }) => (
    <Avatar className="h-20 w-20 rounded-md">
      <img 
        src={src} 
        alt={alt}
        className="aspect-square h-full w-full object-cover rounded-md"
      />
    </Avatar>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
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
                {itemsCarrito.map((item) => (
                  <TableRow key={item.id} className="h-24">
                    <TableCell>
                      <ProductImage src={item.imagen} alt={item.nombre} />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.nombre}</p>
                        <p className="text-sm text-gray-500">SKU: {item.product_id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.precioUnidad.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => disminuirCantidad(item.id)}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.cantidad}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => aumentarCantidad(item.id)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.precioTotal.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => eliminarItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
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
                onClick={handleVaciarCarrito}
              >
                Vaciar Carrito
              </Button>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold">${calculateTotal().toFixed(2)}</p>
            </div>
          </div>
          <Button className="w-full" size="lg">
            Proceder al Pago
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default Carrito;