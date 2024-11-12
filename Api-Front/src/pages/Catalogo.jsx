import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Catalogo.css';
import BtnAgregarCarrito from '../componentes/Carrito/BtnAgregarCarrito.jsx';
import BtnEditar from '../componentes/Gestor/BtnEditar.jsx';
import BtnCrearArt from '../componentes/Gestor/BtnCrearArt.jsx';
import AuthContext from '../context/AuthContext.jsx';
import { useContext} from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";


const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {user} = useContext(AuthContext);

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
        {user?.rol === 'ADMIN' ? <BtnCrearArt /> : <div></div>}
      </div>
  
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((producto) => (
            <div key={producto.id} className="w-[300px] group relative space-y-4">
              <figure className="group-hover:opacity-90">
                <img
                  className="w-full rounded-lg aspect-square"
                  src={producto.imagen}
                  width={300}
                  height={500}
                  alt={producto.nombre}
                />
              </figure>
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg">
                  <a Link to={`/producto/${producto.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {producto.nombre}
                    </a>
                  </h3>
                  <p className="text-sm text-muted-foreground">{producto.categoria}</p>
                </div>
                <p className="text-lg font-semibold">{producto.precio}</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <HeartIcon className="size-4" />
                </Button>
                <Button variant="outline" className="w-full">
                  <PlusIcon className="size-4 me-1" /> Add to Cart
                </Button>
              </div>
              {producto.stock === 0 ? (
                <p>Sin Stock</p>
              ) : (
                <BtnAgregarCarrito producto={producto} />
              )}
              {user?.rol === 'ADMIN' ? <BtnEditar producto={producto} /> : <div></div>}
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