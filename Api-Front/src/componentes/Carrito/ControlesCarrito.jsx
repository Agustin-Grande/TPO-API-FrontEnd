import React from 'react';
import './ControlesCarrito.css';
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext.jsx'
import {checkout} from '../../services/serviceCheckout.js'

const ControlesCarrito = ({carrito, onVaciarCarrito}) => {

    const { user } = useContext(AuthContext)

    const obtenerItemsCarrito = async (carritoId) => {
        try {
            const response = await axios.get(`http://localhost:3001/carrito_item?carrito_id=${carritoId}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener items del carrito:", error);
        }
    };

    const vaciarCarrito = async () =>{
        try {
            let items = await obtenerItemsCarrito(carrito.id);
            for (const item of items) {
                await axios.delete(`http://localhost:3001/carrito_item/${item.id}`);
            }

            await axios.patch(`http://localhost:3001/carrito/${carrito.id}`, {
                precioTotal: 0
            });
            onVaciarCarrito()
            console.log("Carrito vaciado");
        } catch (error) {
            console.error("Error al vaciar carrito:", error);
        }
    }

    const confirmarCarrito = () =>{
        checkout(carrito)
        vaciarCarrito()
    }

    return (
        <div className="controles-carrito">
            <button className="btn-confirmar" onClick={confirmarCarrito}>
                Confirmar Carrito
            </button>
            <button className="btn-vaciar" onClick={vaciarCarrito}>
                Vaciar Carrito
            </button>
        </div>
    );
};

export default ControlesCarrito;
