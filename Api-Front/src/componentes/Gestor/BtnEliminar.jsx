import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import apiClient from '../../services/apiClient';





const BtnEliminar = ({ producto }) => {

    const navigate = useNavigate()

    const eliminarProd = async (producto) =>{
        const response = await apiClient.delete(`/Productos/management/eliminar/${producto.id}`);
        window.location.reload();
    }

    return (
        <Button variant="outline" className="w-full" onClick={() => eliminarProd(producto)}>
         Eliminar Producto
      </Button>
    );
    
};



export default BtnEliminar;