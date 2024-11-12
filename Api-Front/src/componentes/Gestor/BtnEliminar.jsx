import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';




const BtnEliminar = ({ producto }) => {

    const navigate = useNavigate()

    const eliminarProd = async (producto) =>{
        const response = await axios.delete(`http://localhost:3001/productos/${producto.id}`);
        window.location.reload();
    }

    return (
        <Button variant="outline" className="w-full" onClick={() => eliminarProd(producto)}>
         Eliminar Producto
      </Button>
    );
    
};



export default BtnEliminar;