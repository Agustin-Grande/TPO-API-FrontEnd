import './styles/App.css'
import Login from './componentes/Autenticacion/Login'
import ItemCarrito from './componentes/Carrito/ItemCarrito';
import Carrito from './pages/Carrito.jsx';

function App() {
  return (
    <div>
      <Carrito idUsuario={1}/>
    </div>
  );
}

export default App
