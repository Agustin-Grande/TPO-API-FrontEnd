import './ItemCarrito.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext.jsx'

const ItemCarrito = ({ item, eliminarItem,sumar,restar }) => {
    const [producto, setProducto] = useState({});
    const { user } = useContext(AuthContext)

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

    

    
    return (
        <div className="item">
            <div className='itemDetail'>
                <strong>{producto.nombre}</strong> {/* Aquí usamos el estado */}
            </div>
            <div className="itemDetail">${item.precioUnidad}</div>
            <div className="itemDetail">${item.precioTotal}</div>
            <div className="itemDetail">
                <button onClick={() => restar(item, producto)}>-</button>
                {item.cantidad}
                <button onClick={() => sumar(item, producto)}>+</button>
            </div>
            <div className="itemDetail">
                <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
            </div>
        </div>
    );
};

export default ItemCarrito;
