import React, { useState, useEffect } from 'react';
import "../styles/Registro.css";
import { handleRegister } from '../services/serviceRegistro';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Registro = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    email: '',
    contrasena: '',
    rol: ''
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
      [e.target.name]: e.target.value
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
    <div className="registro">
      <form onSubmit={manejarEnvioFormulario} className="formulario">
        <h1 className="titulo">Registro</h1>

        <div>
          <input
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={manejarCambioInput}
            placeholder="Nombre"
          />
        </div>
        <div>
          <input
            type="text"
            name="apellido"
            value={usuario.apellido}
            onChange={manejarCambioInput}
            placeholder="Apellido"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={manejarCambioInput}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="text"
            name="nombreUsuario"
            value={usuario.nombreUsuario}
            onChange={manejarCambioInput}
            placeholder="Nombre de usuario"
          />
        </div>
        <div>
          <input
            type="password"
            name="contrasena"
            value={usuario.contrasena}
            onChange={manejarCambioInput}
            placeholder="Contraseña"
          />
        </div>
        <div>
          <input
            type="text"
            name="rol"
            value={usuario.rol}
            onChange={manejarCambioInput}
            placeholder="Rol de usuario"
          />
        </div>
        <button type="submit">Registrarse</button>
        <p>¿Ya tienes cuenta? <Link to="/login">Login</Link></p>
      </form>

      {/* Contenedor de mensajes */}
      <div className="mensajesRegistro">
        {error && <p style={{ color: 'red' }}>Todos los campos son obligatorios</p>}
        {registroExitoso && <p style={{ color: 'green' }}>¡Registro exitoso!</p>}
        {mensajeError && <p>{mensajeError}</p>}
      </div>
    </div>
  );
};

export default Registro;
