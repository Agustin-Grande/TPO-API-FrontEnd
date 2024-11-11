import React, { useState, useEffect } from 'react';
import "../styles/Login.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-title">Login</h1>

        <div className="login-username">
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
        <p>¿No tenes cuenta? <Link to="/registro" className='regi'>Registro</Link></p>
      </form>
      {/* Contenedor de mensajes */}
      <div className="login-messages">
        {errorL && <p style={{ color: 'red' }}>{errorL}</p>} {/* Mostrar error debajo del formulario */}
      </div>
    </div>
  );
};

export default Login;
