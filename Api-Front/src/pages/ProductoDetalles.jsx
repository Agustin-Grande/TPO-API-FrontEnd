import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, ChevronDown, ChevronUp, Loader2, ArrowLeft, ShoppingCart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const ProductoDetalles = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/productos/${id}`);
        if (!response.ok) throw new Error('Error al cargar el producto');
        const data = await response.json();
        setProducto(data);
        setFavorito(data.favorito || false);
        setError(null);
      } catch (error) {
        setError('No se pudo cargar el producto. Por favor, intente nuevamente.');
        console.error('Error al cargar el producto:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  const handleFavoritoClick = async () => {
    try {
      const nuevoEstadoFavorito = !favorito;
      setFavorito(nuevoEstadoFavorito);
      
      const response = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorito: nuevoEstadoFavorito }),
      });
      
      if (!response.ok) throw new Error('Error al actualizar favorito');
    } catch (error) {
      console.error('Error al actualizar el estado de favorito:', error);
      setFavorito(!favorito); // Revert on error
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="w-96">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!producto) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-sm mb-6 hover:text-primary">
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
                    Cantidad:
                  </label>
                  <div className="flex gap-4">
                    <Input
                      type="number"
                      id="cantidad"
                      min="1"
                      max={producto.stock}
                      value={cantidad}
                      onChange={(e) => setCantidad(parseInt(e.target.value))}
                      className="w-24"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    asChild 
                    className="flex-1"
                    disabled={producto.stock === 0}
                  >
                    <Link to="/formulario">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Comprar
                    </Link>
                  </Button>
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