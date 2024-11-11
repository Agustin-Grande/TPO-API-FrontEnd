import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const TarjetaCompra = ({ ordenes }) => {
  const navigate = useNavigate();

  const handleVerDetalles = (orden) => {
    navigate('/detalles-orden', { state: { orden } });
  };

  return (
    <>
      {ordenes.map((orden, index) => (
        <div className="card mb-3" key={index}>
          <div className="row g-0">
            <div className="col-12">
              <div className="card-body d-flex flex-row justify-content-between align-items-center" style={{ border: "solid 0.5px grey"}}>
                <div>
                  <h5 className="card-title">Orden del {orden.fecha}</h5>
                  <p className="card-text"><strong>Costo_final:</strong> ${orden.precio_total}</p>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <button 
                    className="btn btn-primary mt-2"
                    onClick={() => handleVerDetalles(orden)}
                    style={{ transition: 'background-color 0.3s' }}
                    onMouseEnter={(e) => e.target.style.background = '#30182F' }
                    onMouseLeave={(e) => e.target.style.background = '' }
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

TarjetaCompra.propTypes = {
  ordenes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      precio_total: PropTypes.number.isRequired,
      fecha: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TarjetaCompra;
