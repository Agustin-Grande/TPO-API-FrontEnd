import React, { useState } from 'react';
import "../styles/Login.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setNombreUsuario(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(nombreUsuario, contrasena);
    navigate("/home"); 
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <div>
          <input
            type="text"
            name="nombreUsuario"
            value={nombreUsuario}
            onChange={handleUserNameChange}
            placeholder="Nombre de usuario"
          />
        </div>
        <div>
          <input
            type="password"
            name="contrasena"
            value={contrasena}
            onChange={handlePasswordChange}
            placeholder="Contraseña"
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <p>¿No tienes cuenta? <Link to="/registro">Registro</Link></p>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
