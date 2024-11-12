import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Catalogo.css';
import BtnAgregarCarrito from '../componentes/Carrito/BtnAgregarCarrito.jsx';
import BtnEditar from '../componentes/Gestor/BtnEditar.jsx';
import BtnEliminar from '../componentes/Gestor/BtnEliminar.jsx';

import BtnCrearArt from '../componentes/Gestor/BtnCrearArt.jsx';
import AuthContext from '../context/AuthContext.jsx';
import { useContext } from "react";
import { useVistos } from '../hooks/useVistos';


const categories = ["Todos", "Camiseta", "Short", "Pantalon", "Remera", "Calzado"];

const Catalogo = () => {
  const { vistos, agregarVisto } = useVistos(); 
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {user} = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    filterProducts(search, category);
  };

  const filterProducts = (searchValue, category) => {
    let filtered = productos;

    if (category !== "Todos") {
      filtered = filtered.filter(producto => producto.categoria.toLowerCase() === category.toLowerCase());
    }
    if (searchValue) {
      filtered = filtered.filter(producto =>
        producto.nombre.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  

  return (
    <div >
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={selectedCategory === category ? "active" : ""}
        >
          {category}
        </button>
      ))}
    </div>
      
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={handleSearchChange}
      />
     {user?.rol === 'ADMIN' ? <BtnCrearArt /> : <div></div>}

    </div>

    <div className="product-grid">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((producto) => (
          <div key={producto.id} className="w-[300px] group relative space-y-3">
            <figure className="group-hover:opacity-90">
              <Link to={`/producto/${producto.id}`} onClick={() => agregarVisto(producto)}>
                <img
                  className="w-full rounded-lg aspect-square"
                  src={producto.imagen}
                  width={300}
                  height={500}
                  alt={producto.nombre}
                />
              </Link>
            </figure>
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg">
                  <Link to={`/producto/${producto.id}`}>
                    {producto.nombre}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">{producto.categoria}</p>
              </div>
              <p className="text-lg font-semibold">${producto.precio}</p>
            </div>
            <div className="flex gap-4">
              {producto.stock === 0 ? (
              <p>Sin Stock</p>
            ) : (
              <BtnAgregarCarrito producto={producto} />
            )}
              
            </div>
            {user?.rol === 'ADMIN' ?  <BtnEditar producto={producto} /> : <div></div>}
            {user?.rol === 'ADMIN' ?  <BtnEliminar producto={producto} /> : <div></div>}

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