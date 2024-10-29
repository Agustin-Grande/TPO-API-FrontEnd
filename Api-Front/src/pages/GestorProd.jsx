import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductList from '../componentes/Gestor/ProductList'; // Import ProductList component

const GestorProd = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/producto`);
                console.log(res.data);
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Gestor de Productos</h1>
            {products.length > 0 ? (
                <ProductList initialProducts={products} />
            ) : (
                <p>Cargando productos...</p>
            )}
        </div>
    );
};

export default GestorProd;
