import React, { useState, useEffect } from 'react';
import "../styles/Registro.css";
import { handleRegister } from '../services/serviceRegistro';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Registro = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    email: '',
    contrasena: ''
  });
  const [mensajeError, setMensajeError] = useState(null);
  const [error, setError] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);



  const manejarCambioInput = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value, 
      favoritos : []
    });
  };

  const manejarEnvioFormulario = async (e) => {
    e.preventDefault();

    if (!usuario.nombre || !usuario.apellido || !usuario.email || !usuario.nombreUsuario || !usuario.contrasena) {
      setError(true);
      setMensajeError(null);
      setRegistroExitoso(false);
      return;
    }

    setError(false);
    try {
      const data = await handleRegister(usuario);
      console.log(data.registro.data);

      if (data.success) {
        setRegistroExitoso(true);
        setMensajeError(null);
        await login(data.registro.data.nombreUsuario, data.registro.data.contrasena);
        navigate("/home");
      } else {
        setRegistroExitoso(false);
        setMensajeError(data.message || "Error en el registro. Intenta de nuevo.");
      }
    } catch (error) {
      setMensajeError("Error al conectar con la base de datos");
      setRegistroExitoso(false);
      setError(false);
    }
  };

  return (
  <Card className="mx-auto max-w-2xl"> {/* Updated max width here */}
    <CardHeader className="space-y-2">
      <CardTitle className="text-3xl font-bold">Registro</CardTitle>
      <CardDescription>Ingresa tus datos para registrarte</CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={manejarEnvioFormulario} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nombreUsuario">Nombre</Label>
          <Input
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={manejarCambioInput}
            placeholder="Nombre"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apellido">Apellido</Label>
          <Input
            type="text"
            name="apellido"
            value={usuario.apellido}
            onChange={manejarCambioInput}
            placeholder="Apellido"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={usuario.email}
            onChange={manejarCambioInput}
            placeholder="Email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nombreUsuario">Username</Label>
          <Input
            type="text"
            name="nombreUsuario"
            value={usuario.nombreUsuario}
            onChange={manejarCambioInput}
            placeholder="Nombre de usuario"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contrasena">Contraseña</Label>
          <Input
            type="password"
            name="contrasena"
            value={usuario.contrasena}
            onChange={manejarCambioInput}
            placeholder="Contraseña"
            required
          />
        </div>
        
        <Button type="submit" className="w-full">
          Registrarse
        </Button>
        <p>¿Ya tienes cuenta? <Link to="/login" className="logi">Login</Link></p>
        <div className="mensajesRegistro">
          {error && <p style={{ color: 'red' }}>Todos los campos son obligatorios</p>}
          {registroExitoso && <p style={{ color: 'green' }}>¡Registro exitoso!</p>}
          {mensajeError && <p>{mensajeError}</p>}
        </div>
      </form>
    </CardContent>
  </Card>

  );
};

export default Registro;
