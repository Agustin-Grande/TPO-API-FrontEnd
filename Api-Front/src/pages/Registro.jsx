import React, { useState } from 'react';
import "../styles/Registro.css";
import ErrorLogin from '../componentes/Autenticacion/ErrorLogin';
import { handleRegister } from '../services/serviceRegistro';
import { Link } from 'react-router-dom';

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

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!newUser.nombre || !newUser.apellido || !newUser.email || !newUser.nombreUsuario || !newUser.contrasena) {
      setError(true);
      setErrorMessage(null);
      setSuccess(false);
      return;
    }

    setError(false);
    try {
      const data = await handleRegister(newUser);

      if (data.success) {
        setSuccess(true);
        setErrorMessage(null);
      } else {
        setSuccess(false);
        setErrorMessage(data.message); 
      }
    } catch (error) {
      setErrorMessage("Error al conectar con la base de datos");
      setSuccess(false);
      setError(false);
    }
  };

  return (
    <div className="registro">
      <h2>Registro</h2>
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
      {error && <p style={{ color: 'red' }}>Todos los campos son obligatorios</p>}
      {success && <p style={{ color: 'green' }}>¡Registro exitoso!</p>}
      {errorMessage && <ErrorLogin message={errorMessage} style={{ color: 'red' }} />}
    </div>
  );
};

export default Registro;
