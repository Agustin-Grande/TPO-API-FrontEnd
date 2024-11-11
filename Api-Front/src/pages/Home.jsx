import React from 'react';
import { useAuth } from '../hooks/useAuth';
import "../styles/Home.css";
import Cuotas9 from '../assets/9cuotas.png'; // Asegúrate de que la ruta sea correcta
import Cuotas6 from '../assets/6cuotas.png';
import envio from '../assets/enviogratis.png';
import retiro from '../assets/retiro.png';
import messi from '../assets/messi.jpg';
import imagen from '../assets/imagen.png';



const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="portada-home">
        <img src={messi} alt="" />
      </div>

      <div className="contenedor-home">
        <div className="cuadrado-home">
          <img src={Cuotas9} alt="Cuotas" />  
        </div>
        <div className="cuadrado-home">
         <img src={Cuotas6} alt="Cuotas" />  
        </div>
        <div className="cuadrado-home">
        <img src={envio} alt="Cuotas" />
        </div>
        <div className="cuadrado-home">
        <img src={retiro} alt="Cuotas" />

        </div>
      </div>
      <div className="bienvenido-home">
        <img src={imagen} alt="Cuotas" />
        <h1>Bienvenido, {user ? user.nombreUsuario : "invitado"}</h1>
      </div>
    </div>
  );
};

export default Home;
