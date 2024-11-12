import React from 'react'

export default function DatosPersonales({ user }) {
    
return (
    <div>
        <h2 className="mb-3">{user.nombreUsuario}</h2>
            <div className="card p-4" style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)', background: 'linear-gradient(to bottom, #f5f5dc, #d3d3d3)'}}>
                <p><strong>Nombre:</strong> {user.nombre}</p>
                <p><strong>Apellido:</strong> {user.apellido}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
    </div>
    )
}
