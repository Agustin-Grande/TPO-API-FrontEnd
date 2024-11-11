import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext.jsx'
import { useEffect, useState } from 'react';
import ItemCarrito from '../componentes/Carrito/ItemCarrito.jsx';
import CarritoVacio from '../componentes/Carrito/carritoVacio.jsx';
import ControlesCarrito from '../componentes/Carrito/ControlesCarrito.jsx';

const Carrito = () => {
    const [carrito, setCarrito] = useState(null);
    const [itemsCarrito, setItems] = useState([]);
    const { user } = useContext(AuthContext)

    useEffect(() => {

        const fetchCarrito = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/carrito?user_id=${user.id}`);
                cargarItems(res.data[0].id)
                setCarrito(res.data[0])
            } catch (err) {
                console.error("Carrito vacío");
            }
        };

        fetchCarrito();
    }, []);

    // Función para levantar los items del carrito
    const cargarItems = (id) => {
        axios
            .get(`http://localhost:3001/carrito_item?carrito_id=${id}`)
            .then((res) => {
                setItems(res.data);
            })
            .catch((err) => console.log(err));
    };

    const handleVaciarCarrito = () => {
        setItems([]); // Actualiza el estado para que el carrito se muestre vacío
    };

    return (
        <>
            {itemsCarrito.length > 0 ? (
                <>
                    {itemsCarrito.map((item, index) => (
                        <ItemCarrito key={index} item={item} />
                    ))}
                    <ControlesCarrito carrito={carrito} onVaciarCarrito={handleVaciarCarrito}/>
                </>
            ) : (
                <CarritoVacio />
            )}
        </>
    );
    

}

export default Carrito