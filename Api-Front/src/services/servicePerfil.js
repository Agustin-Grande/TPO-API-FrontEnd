import axios from "axios";
import apiClient from "./apiClient";

export const verOrdenesPorUsuario = async (usuarioId) => {  
    const response = await axios.get("http://localhost:3001/Orden");

    const ordenes = response.data.filter(orden => orden.user_id === usuarioId);
    return ordenes; 
};

export const verItemsDeOrden = async (orden) => {
    const response = await apiClient.get(`Orden_item`);
    const itemsFiltrados = response.data.filter(item => item.orden_id == orden.id);
    return itemsFiltrados;
};

export const productoPorOrden = async (orden_items) => {
    const ids = orden_items.map(item => item.product_id);
    const responseProductos = await apiClient.get(`productos`);
    const productosFiltrados = responseProductos.data.filter(producto => ids.includes(producto.id));

    return productosFiltrados;
};

export const editarDatosPersonales = async (user, campo, nuevoValor) => {
    const response = await apiClient.put(`usuarios/${user.id}`, { [campo]: nuevoValor });
    return response.data;
}