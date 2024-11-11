import './ItemCarrito.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div className="item">
            <div className='itemDetail'>
                <strong>{nombreProducto}</strong>
            </div>
            <div className="itemDetail">${item.precioUnidad}</div>
            <div className="itemDetail">${item.precioTotal}</div>
            <div className="itemDetail">
                <button onClick={() => disminuirCantidad(item.id)}>-</button>
                {item.cantidad}
                <button onClick={() => aumentarCantidad(item.id)}>+</button>
            </div>
            <div className="itemDetail">
                <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
            </div>
        </div>
    );
};



export default ItemCarrito;