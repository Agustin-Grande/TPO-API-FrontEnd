import React from 'react';
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-links">
        <a href="">Acerca de nosotros</a>
        <span> | </span>
        <a href="/politica-de-privacidad">Política de privacidad</a>
      </div>

      
      <p>&copy; 2024 Style Shoes. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;