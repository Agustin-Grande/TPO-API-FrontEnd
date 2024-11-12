import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Save, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProductoDetalles_Gestor = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`http://localhost:3001/productos/${id}`);
        const data = await response.json();
        setProducto(data);
        setEditProduct(data);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      }
    };
    fetchProducto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:3001/productos/${editProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProduct)
      });
      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!user || user.rol !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Alert variant="destructive" className="w-96">
          <AlertDescription>
            No tienes acceso a editar productos. Esta página es solo para administradores.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <img 
                src={producto.imagen} 
                alt={producto.nombre}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre del Producto</label>
                <Input
                  type="text"
                  name="nombre"
                  value={editProduct.nombre}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Precio</label>
                <Input
                  type="number"
                  name="precio"
                  value={editProduct.precio}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <Input
                    type="number"
                    name="stock"
                    value={editProduct.stock}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Liga</label>
                  <Input
                    type="text"
                    name="liga"
                    value={editProduct.liga}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Equipo</label>
                  <Input
                    type="text"
                    name="equipo"
                    value={editProduct.equipo}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Marca</label>
                  <Input
                    type="text"
                    name="marca"
                    value={editProduct.marca}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between"
                  onClick={() => setMostrarDescripcion(!mostrarDescripcion)}
                >
                  Descripción
                  {mostrarDescripcion ? <ChevronUp /> : <ChevronDown />}
                </Button>
                
                {mostrarDescripcion && (
                  <Textarea
                    name="descripcion"
                    value={editProduct.descripcion}
                    onChange={handleChange}
                    className="mt-2"
                    rows={4}
                  />
                )}
              </div>

              <Button 
                className="w-full"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </>
                )}
              </Button>

              {saveSuccess && (
                <Alert className="mt-4">
                  <AlertDescription>
                    Cambios guardados exitosamente
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductoDetalles_Gestor;