const ItemCarrito = ({ item }) => {
    console.log(item);
    
    return (
        <div style={styles.item}>
            <div style={styles.itemDetail}>
                <strong>Producto</strong>
            </div>
            <div style={styles.itemDetail}>${item.precioUnidad}</div>
            <div style={styles.itemDetail}>{item.cantidad}</div>
        </div>
    );
};

const styles = {
    item: {
        display: 'flex', // Los detalles estarán en una fila
        justifyContent: 'space-between', // Espacio entre los elementos
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    itemDetail: {
        margin: '0 100px', // Espacio entre cada detalle
    }
};

export default ItemCarrito;