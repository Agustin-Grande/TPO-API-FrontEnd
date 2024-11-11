import { useContext} from "react";
import {AuthContext} from '../../context/AuthContext.jsx'
import { useNavigate } from "react-router-dom";
import {agregarCarrito} from '../../services/serviceCart.js'

const BtnAgregarCarrito = ({ producto }) => {

    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    const validarSesion = () =>{
       user ?  agregarAlCarrito(producto) : navigate('/login')
    }

    const agregarAlCarrito = (producto) =>{
        console.log(user); 
        console.log(producto); 
        agregarCarrito(user, producto)
    }

    return (
        <button onClick={() => validarSesion(producto)}>
            Agregar al carrito
        </button>
        // <button onClick={() => agregarAlCarrito(producto)}>
        //     Agregar al carrito
        // </button>
    );
    
};



export default BtnAgregarCarrito;