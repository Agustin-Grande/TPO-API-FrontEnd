import { ShoppingCart } from "lucide-react";

const CarritoVacio = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Tu carrito está vacío</h3>
            <p className="text-sm text-gray-500">¡Agrega algunos productos para empezar!</p>
        </div>
    );
};

export default CarritoVacio;
