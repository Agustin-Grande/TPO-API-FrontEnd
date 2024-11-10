import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Catalogo.css';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchCatalogo = async () => {
    try {
      const response = await axios.get('http://localhost:3001/productos');
      setProductos(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  useEffect(() => {
    fetchCatalogo();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    const filtered = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((producto) => (
            <div key={producto.id} className="product">
              <Link to={`/producto/${producto.id}`}>
                <img src={producto.imagen} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <p>${producto.precio}</p>
              </Link>
              {producto.stock === 0 ? (
                  <p>Sin Stock</p>
                ) : (
                  <button>Agregar al carrito</button>
              )}
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default Catalogo;