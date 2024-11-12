import React, { useState, useEffect } from 'react';
import "../styles/Login.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { login } = useAuth();
  const [errorL, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleUserNameChange = (e) => {
    setNombreUsuario(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreUsuario || !contrasena) {
      setError("Ambos campos son obligatorios");
      return;
    }
    await login(nombreUsuario, contrasena);
    navigate("/home"); 
  };

  return (
    <div>
        <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombreUsuario">Nombre de usuario</Label>
              <Input
                type="text"
                id="nombreUsuario"
                name="nombreUsuario"
                value={nombreUsuario}
                onChange={handleUserNameChange}
                placeholder="Nombre de usuario"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contrasena">Contraseña</Label>
              <Input
                type="password"
                id="contrasena"
                name="contrasena"
                value={contrasena}
                onChange={handlePasswordChange}
                placeholder="Contraseña"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
            <p>¿No tienes cuenta? <Link to="/registro" className='regi'>Registro</Link></p>
            <div className="login-messages">
              {errorL && <p style={{ color: 'red' }}>{errorL}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
