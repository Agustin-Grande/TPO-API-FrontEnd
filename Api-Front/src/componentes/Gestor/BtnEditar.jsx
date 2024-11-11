
import { useNavigate } from "react-router-dom";



const BtnAgregarCarrito = ({ producto }) => {

    const navigate = useNavigate()

    const mostrarProdEdit = (producto) =>{
        navigate(`/productoEdit/${producto.id}`);
    }

    return (
        <button onClick={() => mostrarProdEdit(producto)}>
            Editar Producto
        </button>
        // <button onClick={() => agregarAlCarrito(producto)}>
        //     Agregar al carrito
        // </button>
    );
    
};



export default BtnAgregarCarrito;