import React from 'react'

export default function DatosPersonales({ user }) {
    const handleClick = (campo,user) => {
        console.log(`Editar ${campo}`);
        if (user) {
          const nuevoValor = prompt(`Ingrese el nuevo valor para ${campo}`);  
        }
    }

return (
    <div>
        <h2 className="mb-3">{user.nombreUsuario}</h2>
        <div className="card p-4" style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)', background: 'linear-gradient(to bottom, #f5f5dc, #d3d3d3)'}}>
            <h3>Datos Personales</h3>
            <div className="d-flex flex-row">
                <label><strong>Nombre:</strong></label>
                <input type="text" value={user.nombre}/>
                <button onClick={() => handleClick('nombre',user)}>Editar</button>
            </div>
            <div className="d-flex flex-row">
                <label><strong>Apellido:</strong></label>
                <input type="text" value={user.apellido}/>
                <button onClick={() => handleClick('apellido',user)}>Editar</button>
            </div>
            <div className="d-flex flex-row">
                <label><strong>Email:</strong></label>
                <input type="text" value={user.email}/>
                <button onClick={() => handleClick('mail',user)}>Editar</button>
            </div>
        </div>
    </div>
)
}
