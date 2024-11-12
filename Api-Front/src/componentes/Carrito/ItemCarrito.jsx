import './ItemCarrito.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
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

const ItemCarrito = ({ item }) => {
    const [nombreProducto, setNombreProducto] = useState('');

    useEffect(() => {

        const fetchItem = async () => {
            try {

                const res = await axios.get(`http://localhost:3001/productos?id=${item.product_id}`);
                setNombreProducto(res.data[0].nombre)

            } catch (err) {
                console.error(err);
            }
        };

        fetchItem();
    }, []);


    return (
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
    );
};



export default ItemCarrito;