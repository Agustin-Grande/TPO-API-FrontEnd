import axios from "axios";
import apiClient from "./apiClient";


export const agregarCarrito = async (user, producto) => {

    /*
    let hayStock = validarStock(producto)

    // 1. Obtengo el carrito del user
    let carrito = await obtenerCarrito(user) // Esto debería desaparecer. El back lo hace*/

    // 2. Inserto las lineas del carrito
    let agregadoOk = await agregarItemsCarrito(producto)

    /*if(!agregadoOk){
        return false
    }
    // 3. Seteo el total del carrito
    await actualizarPrecioTotal(carrito)

    return true*/

}

export const actualizarPrecioTotal = async (carrito) => {
    let items = await axios.get(`http://localhost:3001/carrito_item?carrito_id=${carrito.id}`);
    let total = 0

    for (const item of items.data) {
        total += item.precioTotal
    }

    await axios.patch(`http://localhost:3001/carrito/${carrito.id}`, {
        precioTotal: total
    });
}

export const obtenerCarrito = async (user) => {
    let carrito
    try {
        carrito = await axios.get(`http://localhost:3001/carrito?user_id=${user.id}`);

        // Si no existe, Axios devuelve 200 con un arr vacio
        // Por eso esta validacion
        if (carrito.data.length === 0) {
            carrito = await crearCarrito(user.id)
            return carrito
        }
        return carrito.data[0]

    } catch (err) {
        console.error("Error al obtener el carrito");
    }

}

export const agregarItemsCarrito = async (producto, cantidad = 1) => {
    let res = await apiClient.post(`carrito/agregar/${producto.id}/${cantidad}`)
}


const crearCarrito = async (id) => {
    let response
    try {
        const carrito = {
            precioTotal: 0,
            user_id: id
        };

        response = await axios.post('http://localhost:3001/carrito', carrito);
    } catch (error) {
        console.error('Error al crear un carrito');
    }

    return response.data

}

const validarStock = (producto) => {
    return producto.stock > 0
}