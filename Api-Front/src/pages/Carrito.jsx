import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext.jsx'
import { useEffect, useState } from 'react';
import ItemCarrito from '../componentes/Carrito/ItemCarrito.jsx';
import CarritoVacio from '../componentes/Carrito/carritoVacio.jsx';
import ControlesCarrito from '../componentes/Carrito/ControlesCarrito.jsx';
import {agregarItemsCarrito, obtenerCarrito} from '../services/serviceCart.js'

const Carrito = () => {
    const [carrito, setCarrito] = useState(null);
    const [itemsCarrito, setItems] = useState([]);
    const { user } = useContext(AuthContext)

    useEffect(() => {

        const fetchCarrito = async () => {
            console.log("Fetch use effect");
            
            try {
                const res = await axios.get(`http://localhost:3001/carrito?user_id=${user.id}`);               
                await cargarItems(res.data[0].id)
                setCarrito(res.data[0])
            } catch (err) {
                console.error("Carrito vacío");
            }
        };

        fetchCarrito();
    }, []);

    // Función para levantar los items del carrito
    const cargarItems = async (id) => {
        console.log("cargando items");
        
        await axios
            .get(`http://localhost:3001/carrito_item?carrito_id=${id}`)
            .then((res) => {
                console.log(res.data);
                
                setItems(res.data);
            })
            .catch((err) => console.log(err));
    };

    const handleVaciarCarrito = () => {
        setItems([]); // Actualiza el estado para que el carrito se muestre vacío
    };

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
        }

        cargarItems(carrito.id)
    }

    const restarCantidad = async (item, producto) =>{
        console.log(item.cantidad);
        
        if(item.cantidad > 1){
            let carrito = await obtenerCarrito(user)
            await agregarItemsCarrito(carrito.id, producto, -1)
        }

        cargarItems(carrito.id)
    }

    return (
        <>
            {itemsCarrito.length > 0 ? (
                <>
                    {itemsCarrito.map((item, index) => (
                        <ItemCarrito key={index} item={item} eliminarItem={eliminarItem} sumar={sumarCantidad} restar={restarCantidad}/>
                    ))}
                    <ControlesCarrito carrito={carrito} onVaciarCarrito={handleVaciarCarrito} />
                </>
            ) : (
                <CarritoVacio />
            )}
        </>
    );
    

}

export default Carrito