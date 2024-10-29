import axios from 'axios';
import { useEffect, useState } from 'react';

const Carrito = ({idUsuario}) => {

    const [carrito, setCarrito] = useState()
    const [itemsCarrito, setItems] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:3001/carrito/${idUsuario}`)
            .then((res) => {
                console.log(res.data)
                setCarrito(res.data)
            })
            .catch((err) => console.log(err))
    }, [])

    const cargarItems = (id) =>{

        axios
            .get(`http://localhost:3001/carrito_item/${id}`)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }


    return <>
        {carrito ? cargarItems(carrito.id) : console.log("No se encontró carrito para ese user")}  
    </>

}

export default Carrito