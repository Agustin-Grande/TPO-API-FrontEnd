import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";



const BtnCrearArt = ({ producto }) => {

    const navigate = useNavigate()

    const crearProd = () =>{
        navigate(`/crearProd`);
    }

    return (
            <Button variant="outline" className="w-half" onClick={() =>crearProd()}>
            Crear Producto
         </Button>
    );
    
};



export default BtnCrearArt;