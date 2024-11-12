import axios from "axios";

export const checkout = async (carritoId) => {      
    try {
        let carrito = await axios.get(`http://localhost:3001/carrito/${carritoId}`);        

        const nuevaOrden = {
            fecha: "Hoy",
            precio_total: carrito.data.precioTotal,
            user_id: carrito.data.user_id
        };

        const response = await axios.post('http://localhost:3001/Orden', nuevaOrden);
        console.log("Orden creada exitosamente:", response.data);
        await cargarLineasOrden(carrito.data.id, response.data.id) // Id del carrito y de la orden creada
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
            precio_total: item.precioTotal, 
            product_id: item.product_id, 
            orden_id: idOrden 
        };

        console.log("id prod");
        console.log(item.product_id);
        try {
            const response = await axios.post('http://localhost:3001/Orden_item', nuevoItemOrden);
            console.log("Item de orden creado exitosamente:", response.data);
        } catch (error) {
            console.error("Error al crear el item de la orden:", error);
        }

        await actualizarStock(item.product_id, item.cantidad)
    } 
}

const actualizarStock = async (product_id,cantidad) =>{
    let producto = await axios.get(`http://localhost:3001/productos/${product_id}`)    
    try{
        await axios.patch(`http://localhost:3001/productos/${product_id}`, {
            stock: producto.data.stock - cantidad
        });
    }catch{
        console.error("Error actualizando stock");
    }
}

