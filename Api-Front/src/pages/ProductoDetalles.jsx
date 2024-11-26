import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BtnAgregarCarrito from '../componentes/Carrito/BtnAgregarCarrito.jsx';
import apiClient from '../services/apiClient';
import { agregarAFav, eliminarDeFav } from '../services/serviceFav';
import corazonLleno from '../assets/corazon_lleno.png';
import corazonVacio from '../assets/corazon_vacio.png';

const ProductoDetalles = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await apiClient.get(`/catalogo/productos/${id}`);
        setProducto(response.data);

        const favoritosResponse = await apiClient.get('/usuario/listaFavoritos');
        setFavorito(favoritosResponse.data.some((fav) => fav.id === response.data.id));
      } catch (error) {
        console.error('Error al cargar el producto o los favoritos:', error);
      }
    };

    fetchProducto();
  }, [id]);

  const handleFavoritoClick = async () => {
    try {
      if (favorito) {
        await eliminarDeFav(producto.id);
        setFavorito(false);
        alert('Producto eliminado de favoritos');
      } else {
        await agregarAFav(producto);
        setFavorito(true);
        alert('Producto agregado a favoritos');
      }
    } catch (error) {
      console.error('Error al manejar favoritos:', error);
    }
  };

  if (!producto) {
    return <p>Cargando producto...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/catalogo" className="inline-flex items-center text-sm mb-6 hover:text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver al catálogo
      </Link>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              {producto.stock < 10 && producto.stock > 0 && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  ¡Últimas {producto.stock} unidades!
                </Badge>
              )}
              {producto.stock === 0 && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  Agotado
                </Badge>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{producto.nombre}</h1>
                <p className="text-3xl font-bold text-primary">
                  ${producto.precio.toLocaleString()}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Stock disponible: {producto.stock} unidades
                  </span>
                </div>

                <div className="space-y-2">
                  <label htmlFor="cantidad" className="block text-sm font-medium">
                    {producto.equipo}
                  </label>
                  <div className="flex gap-4">
                    <label htmlFor="cantidad" className="block text-sm font-medium">
                      {producto.liga}
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  {producto.stock !== 0 && (
                    <Button
                      asChild
                      className="flex-1"
                      disabled={producto.stock === 0}
                    >
                      <BtnAgregarCarrito producto={producto} />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleFavoritoClick}
                    className={favorito ? 'text-red-500 hover:text-red-600' : ''}
                  >
                    <Heart className={`h-4 w-4 ${favorito ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="ghost"
                  onClick={() => setMostrarDescripcion(!mostrarDescripcion)}
                  className="w-full justify-between"
                >
                  Descripción
                  {mostrarDescripcion ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                {mostrarDescripcion && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    {producto.descripcion}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductoDetalles;