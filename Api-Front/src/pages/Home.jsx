import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth(); 

  return (
    <div>
      <h1>Bienvenido, {user ? user.nombreUsuario : "invitado"}</h1>
      {/* Mostrar más datos del usuario */}
    </div>
  );
};

export default Home;
