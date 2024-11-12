
import { useNavigate } from "react-router-dom";



const BtnCrearArt = ({ producto }) => {

    const navigate = useNavigate()

    const crearProd = () =>{
        navigate(`/crearProd`);
    }

    return (
        <button onClick={() => crearProd()}>
            Editar Producto
        </button>
    );
    
};



export default BtnCrearArt;