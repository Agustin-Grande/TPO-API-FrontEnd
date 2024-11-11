import './ItemCarrito.css'

const ItemCarrito = ({ item }) => {
    
    return (
        <div className="item">
            <div className='itemDetail'>
                <strong>Nombre Producto</strong>
            </div>
            <div className="itemDetail">${item.precioUnidad}</div>
            <div className="itemDetail">${item.precioTotal}</div>
            <div className="itemDetail">{item.cantidad}</div>
        </div>
    );
};



export default ItemCarrito;