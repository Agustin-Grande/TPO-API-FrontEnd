import axios from "axios";


export const agregarCarrito = async (user, producto) => {

    let hayStock = validarStock(producto)

    // 1. Obtengo el carrito del user
    let carrito = await obtenerCarrito(user)

    // 2. Inserto las lineas del carrito
    let agregadoOk = await agregarItemsCarrito(carrito.id, producto)

    if(!agregadoOk){
        return false
    }
    // 3. Seteo el total del carrito
    await actualizarPrecioTotal(carrito)

    return true

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

export const agregarItemsCarrito = async (carritoId, producto, cantidad = 1) => {
    let itemExistente = await axios.get(`http://localhost:3001/carrito_item?carrito_id=${carritoId}&product_id=${producto.id}`);

    // Me fijo si el item ya estaba en el carrito. 
    // Si está, actualizo la cantidad
    // Si no está, creo un item

    if (itemExistente.data.length > 0) {

        const productoExistente = itemExistente.data[0];
        const nuevaCantidad = productoExistente.cantidad + cantidad; // Sumar la nueva cantidad
        const nuevoPrecioTotal = nuevaCantidad * producto.precio

        // Si no hay mas stock
        if(nuevaCantidad > producto.stock ){
            return false
        }

        await axios.patch(`http://localhost:3001/carrito_item/${productoExistente.id}`, {
            cantidad: nuevaCantidad,
            precioTotal: nuevoPrecioTotal
        });
    } else {
        const nuevoItem = {
            cantidad: cantidad,
            precioUnidad: producto.precio,
            precioTotal: producto.precio * cantidad,
            product_id: producto.id,
            carrito_id: carritoId
        }

        await axios.post('http://localhost:3001/carrito_item', nuevoItem);
        return true
    }
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