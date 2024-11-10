import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Catalogo.css';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Función para obtener el catálogo de productos
  const fetchCatalogo = async () => {
    try {
      const response = await axios.get('http://localhost:3001/productos');
      setProductos(response.data);
      setFilteredProducts(response.data); // Inicializar productos filtrados con todos los productos
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  useEffect(() => {
    fetchCatalogo();
  }, []);

  // Manejar el cambio en la barra de búsqueda
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    // Filtrar productos según el valor de búsqueda
    const filtered = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      {/* Barra de búsqueda */}
      <div>
        <br />
        <br />
      </div>
      <div className="search-bar">
        <br />
        <br />
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Productos */}
      <div className="product-grid">
        
        {filteredProducts.length > 0 ? (
          filteredProducts.map((producto) => (
            <div key={producto.id} className="product">
              <a href="#">
                <img src={producto.imagen} alt={producto.nombre} />
                <h3>{producto.nombre}</h3>
                <p>${producto.precio}</p>
              </a>
              <button>Agregar al carrito</button>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
      <br />
    </div>
  );
};

export default Catalogo;