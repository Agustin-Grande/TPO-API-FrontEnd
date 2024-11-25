import apiClient from "./apiClient";

export const checkout = async () => {      
    try {
        let res = await apiClient.post(`carrito/checkout`)
    } catch (error) {
        console.error("Error al crear la orden:", error);
    }
    
}


