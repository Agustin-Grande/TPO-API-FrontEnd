import React, { useState } from 'react';
import "../styles/Login.css";
import axios from 'axios';

const API_URL = 'http://localhost:3001'

const Login = () => {
  const [newUser, setNewUser] = useState({
    nombreUsuario: '',
    contrasena: ''
  });
  const [error, setError] = useState(false);

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
      return;
    }

    setError(false);
    try {
      const response = await axios.get(API_URL + '/users', {
        params: {
            nombreUsuario: newUser.nombreUsuario,
            contrasena: newUser.contrasena
          }
      });
      if (response.data.length > 0) {
        console.log("Bienvenido");
      } else {
        console.log("No se encontró el usuario");
      }
      
    } catch (error) {
      console.log("Error al crear usuario");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='formulario'>
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
        <p>No tenés una cuenta?<a href=""> Registro</a></p>
      </form>
      {error && <p style={{ color: 'red' }}>Todos los campos son obligatorios</p>}
    </div>
  );
};

export default Login;
