import React, { useState } from 'react';
import axios from 'axios';
import "../styles/Login.css";
import ErrorLogin from '../componentes/Autenticacion/ErrorLogin';
import { handleLog } from '../services/serviceLogin';

const Login = () => {
  const [newUser, setNewUser] = useState({
    nombreUsuario: '',
    contrasena: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();

    
    if (newUser.nombreUsuario === '' || newUser.contrasena === '') {
      setError(true);
      setErrorMessage(null);
      setSucces(false);
      return;
    }

    setError(false);
    try {
      const data = await handleLog(newUser);

      
      if (data && data.length > 0) {
        setSucces(true);
        setErrorMessage(null);
      } else {
        setSucces(false);
        setErrorMessage("No se encontró el usuario");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con la base de datos");
      setSucces(false);
      setError(false);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <div>
          <input
            type="text"
            name="nombreUsuario"
            value={newUser.nombreUsuario}
            onChange={handleInputChange}
            placeholder="Nombre de usuario"
          />
        </div>
        <div>
          <input
            type="password"
            name="contrasena"
            value={newUser.contrasena}
            onChange={handleInputChange}
            placeholder="Contraseña"
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        <p>No tenés una cuenta? <a href="/registro">Registro</a></p>
      </form>
      {error && <p style={{ color: 'red' }}>Todos los campos son obligatorios</p>}
      {succes && <p style={{ color: 'green' }}>Login exitoso!</p>}
      {errorMessage && <ErrorLogin message={errorMessage} style={{ color: 'red' }} />}
    </div>
  );
};

export default Login;