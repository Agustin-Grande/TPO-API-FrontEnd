import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, Save, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import apiClient from '../services/apiClient';


const ProductoDetalles_Gestor = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await apiClient.get(`/Productos/${id}`);
        //const data = await response.json();
        console.log(response);
        setProducto(response.data);
        setEditProduct(response.data);
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!editProduct.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
   // if (!editProduct.imagen.trim()) newErrors.imagen = 'La URL de la imagen es requerida';
    if (!editProduct.precio || isNaN(editProduct.precio) || editProduct.precio < 0) newErrors.precio = 'Ingrese un precio válido';
    if (!editProduct.stock || isNaN(editProduct.stock) || editProduct.stock < 0) newErrors.stock = 'Ingrese un stock válido';
    if (!editProduct.liga) newErrors.liga = 'Seleccione una liga';
    if (!editProduct.equipo.trim()) newErrors.equipo = 'El equipo es requerido';
    if (!editProduct.marca) newErrors.marca = 'Seleccione una marca';
    if (!editProduct.categoria) newErrors.categoria = 'Seleccione una categoría';
    if (!editProduct.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleSave = async () => {
    if (validateForm()) {
    setSaving(true);
    try {
      const response = await apiClient.put(`/Productos/management/update/${editProduct.id}`, editProduct);

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setSaving(false);
    }
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
                  className={errors.nombre ? 'border-red-500' : ''}
                  />
                  {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Precio</label>
                <Input
                  type="number"
                  name="precio"
                  min="0"
                  value={editProduct.precio}
                  onChange={handleChange}
                  className={errors.precio ? 'border-red-500' : ''}
                />
                {errors.precio && <p className="text-red-500 text-sm mt-1">{errors.precio}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <Input
                    type="number"
                    name="stock"
                    min="0"
                    value={editProduct.stock}
                    onChange={handleChange}
                    className={errors.stock ? 'border-red-500' : ''}
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Liga</label>
                  <Input
                    type="text"
                    name="liga"
                    value={editProduct.liga}
                    onChange={handleChange}
                    className={errors.liga ? 'border-red-500' : ''}
                  />
                  {errors.liga && <p className="text-red-500 text-sm mt-1">{errors.liga}</p>}
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
                    className={errors.equipo ? 'border-red-500' : ''}
                />
                {errors.equipo && <p className="text-red-500 text-sm mt-1">{errors.equipo}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Marca</label>
                  <Input
                    type="text"
                    name="marca"
                    value={editProduct.marca}
                    onChange={handleChange}
                  className={errors.marca ? 'border-red-500' : ''}
                />
                {errors.marca && <p className="text-red-500 text-sm mt-1">{errors.marca}</p>}
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