import { useContext} from "react";
import {AuthContext} from '../../context/AuthContext.jsx'
import { useNavigate } from "react-router-dom";
import {agregarCarrito} from '../../services/serviceCart.js'
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";



const BtnAgregarCarrito = ({ producto }) => {

    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    const validarSesion = () =>{
       user ? agregarAlCarrito(producto) : navigate('/login')
    }

    const agregarAlCarrito = (producto) =>{ 
        agregarCarrito(user, producto)
    }

    return (
        <Button variant="outline" className="w-full" onClick={() => validarSesion(producto)}>
        <PlusIcon className="size-4 me-1" /> Add to Cart
      </Button>
    );
    
};



export default BtnAgregarCarrito;