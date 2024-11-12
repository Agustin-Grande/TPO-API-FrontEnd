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
  import { Avatar } from "@/components/ui/avatar";


const ItemCarrito = ({ item, eliminarItem,sumar,restar }) => {
  const [producto, setProducto] = useState({});

    // Llamamos a getProducto cuando el componente se monta o cuando item cambie
    useEffect(() => {
      if (item.product_id) {
          getProducto();
      }
  }, [item]); // Dependencia: se ejecutará cuando `item` cambie


  // Función para obtener el nombre del producto
  const getProducto = async () => {
      try {
          const res = await axios.get(`http://localhost:3001/productos?id=${item.product_id}`);
          setProducto(res.data[0]); // Actualiza el estado con el nombre del producto
      } catch (err) {
          console.error(err);
      }
    };
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
              onClick={() => restar(item, producto)}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.cantidad}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => sumar(item, producto)}
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