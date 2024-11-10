import React, { useState } from 'react';
import "../styles/Registro.css";
import { handleRegister } from '../services/serviceRegistro';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

const Registro = () => {
  const [newUser, setNewUser] = useState({
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    email: '',
    contrasena: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); 
  const { login } = useAuth(); 

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!newUser.nombre || !newUser.apellido || !newUser.email || !newUser.nombreUsuario || !newUser.contrasena) {
      setError(true);
      setErrorMessage(null);
      setSuccess(false);
      return;
    }

    setError(false);
    try {
      const data = await handleRegister(newUser);
      console.log(data.registro.data); 

      if (data.success) {
        setSuccess(true);
        setErrorMessage(null);
        await login(data.registro.data.nombreUsuario, data.registro.data.contrasena);
        navigate("/home"); 
      } else {
        setSuccess(false);
        setErrorMessage(data.message || "Error en el registro. Intenta de nuevo.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con la base de datos");
      setSuccess(false);
      setError(false);
    }
  };

  return (
    <div className="registro">
      <form onSubmit={handleSubmit} className="formulario">
        <div>
          <input
            type="text"
            name="nombre"
            value={newUser.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
        </div>
        <div>
          <input
            type="text"
            name="apellido"
            value={newUser.apellido}
            onChange={handleInputChange}
            placeholder="Apellido"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </div>
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
        <button type="submit">Registrarse</button>
        <p>¿Ya tienes cuenta? <Link to="/">Login</Link></p>
      </form>

      {/* Contenedor de mensajes */}
      <div className="mensajes">
        {error && <p style={{ color: 'red' }}>Todos los campos son obligatorios</p>}
        {success && <p style={{ color: 'green' }}>¡Registro exitoso!</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Registro;
