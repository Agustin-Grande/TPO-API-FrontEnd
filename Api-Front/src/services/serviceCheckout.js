import axios from "axios";

export const checkout = async (carrito) => {

    const nuevaOrden = {
        fecha: "Hoy",
        precio_total: carrito.precioTotal,
        user_id: carrito.user_id
    };

    try {
        const response = await axios.post('http://localhost:3001/Orden', nuevaOrden);
        console.log("Orden creada exitosamente:", response.data);
        cargarLineasOrden(carrito.id, response.data.id) // Id del carrito y de la orden creada
    } catch (error) {
        console.error("Error al crear la orden:", error);
    }

    
    
}

const cargarLineasOrden = async (idCarrito, idOrden) => {
    let items = await axios.get(`http://localhost:3001/carrito_item?carrito_id=${idCarrito}`);

    for (const item of items.data) {

        const nuevoItemOrden = {
            cantidad: item.cantidad,
            precio_unidad: item.precioUnidad,
            precio_total: item.precioTotal, // cantidad * precio_unidad
            product_id: item.product_id, // ID del producto que estás añadiendo
            orden_id: idOrden // ID de la orden a la que se agregará este item
        };
    
        try {
            const response = await axios.post('http://localhost:3001/Orden_item', nuevoItemOrden);
            console.log("Item de orden creado exitosamente:", response.data);
        } catch (error) {
            console.error("Error al crear el item de la orden:", error);
        }
        
    }

      
}

