const ItemCarrito = ({ item }) => {
    return (
        <div style={styles.item}>
            <div style={styles.itemDetail}>
                <strong>Producto</strong>
            </div>
            <div style={styles.itemDetail}>Precio</div>
            <div style={styles.itemDetail}>Cantidad</div>
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