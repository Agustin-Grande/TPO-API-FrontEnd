import React, { useState } from 'react';
import Product from './Product';

function ProductList({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts);

    const handleUpdate = (updatedProduct) => {
        setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    };

    return (
        <div className="product-list">
            {products.map((product) => (
                <Product key={product.id} product={product} onUpdate={handleUpdate} />
            ))}
        </div>
    );
}

export default ProductList;
