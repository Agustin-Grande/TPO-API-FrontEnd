import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';


const FormProducto = () => {
  const initialState = {
    imagen: '',
    nombre: '',
    precio: '',
    stock: '',
    liga: '',
    equipo: '',
    marca: '',
    categoria: '',
    descripcion: '',
    favorito: false,
    visto: false,
    destacado: false
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const ligas = ["LaLiga", "Premier League", "Serie A", "Bundesliga", "Ligue 1"];
  const marcas = ["Nike", "Adidas", "Puma", "New Balance", "Under Armour"];
  const categorias = ["CAMISETA", "SHORTS", "MEDIAS", "ACCESORIOS"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const handleSwitchChange = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSelectChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.imagen.trim()) newErrors.imagen = 'La URL de la imagen es requerida';
    if (!formData.precio || isNaN(formData.precio)) newErrors.precio = 'Ingrese un precio válido';
    if (!formData.stock || isNaN(formData.stock)) newErrors.stock = 'Ingrese un stock válido';
    if (!formData.liga) newErrors.liga = 'Seleccione una liga';
    if (!formData.equipo.trim()) newErrors.equipo = 'El equipo es requerido';
    if (!formData.marca) newErrors.marca = 'Seleccione una marca';
    if (!formData.categoria) newErrors.categoria = 'Seleccione una categoría';
    if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(`http://localhost:3001/productos`, formData);
      } catch (error) {
        console.error("Error updating product:", error);
      } 
      console.log('Form submitted:', {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock)
      });
      // Reset form after successful submission
      setFormData(initialState);
    }
  };
  
  
const handleSave = async () => {
  try {
      const response = await axios.post(`http://localhost:3001/productos`, editProduct);
  } catch (error) {
      console.error("Error updating product:", error);
  } 
};

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Crear Nuevo Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="imagen">URL de la Imagen</Label>
              <Input
                id="imagen"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                className={errors.imagen ? 'border-red-500' : ''}
              />
              {errors.imagen && <p className="text-red-500 text-sm mt-1">{errors.imagen}</p>}
            </div>

            <div>
              <Label htmlFor="nombre">Nombre del Producto</Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? 'border-red-500' : ''}
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="precio">Precio</Label>
                <Input
                  id="precio"
                  name="precio"
                  type="number"
                  value={formData.precio}
                  onChange={handleChange}
                  className={errors.precio ? 'border-red-500' : ''}
                />
                {errors.precio && <p className="text-red-500 text-sm mt-1">{errors.precio}</p>}
              </div>

              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  className={errors.stock ? 'border-red-500' : ''}
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="liga">Liga</Label>
                <Select 
                  value={formData.liga} 
                  onValueChange={(value) => handleSelectChange(value, 'liga')}
                >
                  <SelectTrigger className={errors.liga ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Seleccionar Liga" />
                  </SelectTrigger>
                  <SelectContent>
                    {ligas.map(liga => (
                      <SelectItem key={liga} value={liga}>{liga}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.liga && <p className="text-red-500 text-sm mt-1">{errors.liga}</p>}
              </div>

              <div>
                <Label htmlFor="equipo">Equipo</Label>
                <Input
                  id="equipo"
                  name="equipo"
                  value={formData.equipo}
                  onChange={handleChange}
                  className={errors.equipo ? 'border-red-500' : ''}
                />
                {errors.equipo && <p className="text-red-500 text-sm mt-1">{errors.equipo}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="marca">Marca</Label>
                <Select 
                  value={formData.marca} 
                  onValueChange={(value) => handleSelectChange(value, 'marca')}
                >
                  <SelectTrigger className={errors.marca ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Seleccionar Marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {marcas.map(marca => (
                      <SelectItem key={marca} value={marca}>{marca}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.marca && <p className="text-red-500 text-sm mt-1">{errors.marca}</p>}
              </div>

              <div>
                <Label htmlFor="categoria">Categoría</Label>
                <Select 
                  value={formData.categoria} 
                  onValueChange={(value) => handleSelectChange(value, 'categoria')}
                >
                  <SelectTrigger className={errors.categoria ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Seleccionar Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map(categoria => (
                      <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className={`min-h-[100px] ${errors.descripcion ? 'border-red-500' : ''}`}
              />
              {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
            </div>

          
          </div>

          <Button type="submit" className="w-full">
            Crear Producto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormProducto;