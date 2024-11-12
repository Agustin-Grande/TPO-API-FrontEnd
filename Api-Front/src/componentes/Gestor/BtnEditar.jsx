import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";



const BtnAgregarCarrito = ({ producto }) => {

    const navigate = useNavigate()

    const mostrarProdEdit = (producto) =>{
        navigate(`/productoEdit/${producto.id}`);
    }

    return (
        <Button variant="outline" className="w-full" onClick={() => mostrarProdEdit(producto)}>
         Editar Producto
      </Button>
    );
    
};



export default BtnAgregarCarrito;