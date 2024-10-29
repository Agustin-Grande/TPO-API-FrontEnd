import React, { useState } from 'react';
import axios from 'axios';


function Product({ product, onUpdate }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [editProduct, setEditProduct] = useState(product);

    const handleToggle = () => setIsExpanded(!isExpanded);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProduct({
            ...editProduct,
            [name]: value
        });
    };


    const handleSave = async () => {
        try {
            // Assuming the product has an id and you're updating by ID
            const response = await axios.put(`http://localhost:3001/producto/${editProduct.id}`, editProduct);
            onUpdate(response.data); // Notify parent of the update
            setIsExpanded(false);     // Collapse the form after saving
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="product">
            <h2 onClick={handleToggle}>{editProduct.nombre}</h2>
            {isExpanded && (
                <div className="product-details">
                    <label>
                        Precio: &nbsp;
                        <input type="number" name="precio" value={editProduct.precio} onChange={handleChange} />
                    </label>
                    &nbsp;
                    &nbsp;
                    <label>
                        Stock: &nbsp;
                        <input type="number" name="stock" value={editProduct.stock} onChange={handleChange} />
                        <br></br>
                        <br></br>
                    </label>
                    &nbsp;
                    &nbsp;
                    <label>
                        Liga: &nbsp;
                        <input type="text" name="liga" value={editProduct.liga} onChange={handleChange} />
                    </label>
                    &nbsp;
                    &nbsp;
                    <label>
                        Equipo: &nbsp;
                        <input type="text" name="equipo" value={editProduct.equipo} onChange={handleChange} />
                    </label>
                    &nbsp;
                    &nbsp;
                    <label>
                        Marca: &nbsp;
                        <input type="text" name="marca" value={editProduct.marca} onChange={handleChange} />
                        <br></br>
                        <br></br>
                    </label>
                    &nbsp;
                    &nbsp;
                    <label>
                        Descripción: &nbsp;
                        <textarea name="descripcion" value={editProduct.descripcion} onChange={handleChange}></textarea>
                    </label>
                    &nbsp;
                    &nbsp;
                    <br></br>
                    <br></br>
                    
                    <button onClick={handleSave}>Guardar</button>
                </div>
            )}
        </div>
    );
}

export default Product;
