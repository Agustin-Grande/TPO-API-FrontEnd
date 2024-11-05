import React from 'react'
import PropTypes from 'prop-types'

function tarjetaCompra(index, compra) {
  return (
      <div key={index} id="tarjeta" className="card mb-3" style={{maxWidth: '540px'}}>
        <div className="row g-0">
            <div className="col-md-4">
                <img src={compra.imagen} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">Compra del {compra.fecha}</h5>
                    <p className="card-text">Cantidad de productos comprados: {compra.cantidad} <br /> Costo final: {compra.precio * compra.cantidad}</p>
                </div>
            </div>
        </div>
    </div>
  )
}


export default tarjetaCompra

