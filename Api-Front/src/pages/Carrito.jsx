import axios from 'axios';
import { useEffect, useState } from 'react';
import ItemCarrito from '../componentes/Carrito/ItemCarrito.jsx';

const Carrito = ({idUsuario}) => {
    const [carrito, setCarrito] = useState(null); 
    const [itemsCarrito, setItems] = useState([]);

    useEffect(() => {
        const fetchCarrito = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/carrito/${idUsuario}`);
                console.log("OK");
                console.log(res.data);
                cargarItems(res.data.id)
                setCarrito(carrito)
            } catch (err) {
                const res = await crearCarrito(idUsuario)
                console.error("Creando Carrito");
                setItems([])
            }
        };

        fetchCarrito();
    }, []); 

    // Función para levantar los items del carrito
    const cargarItems = (id) => {
        axios
            .get(`http://localhost:3001/carrito_item?carrito_id=${id}`)
            .then((res) => {
                console.log(res.data);
                setItems(res.data); 
            })
            .catch((err) => console.log(err));
    };

    const crearCarrito = (id) => {

    }

    return (
        <div>
            {itemsCarrito.map((item, index) => (
                <ItemCarrito key={index} item={item} />
            ))}
        </div>
    );

    




}

export default Carrito