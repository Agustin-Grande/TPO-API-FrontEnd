
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from './rutas/AppRoutes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider> 
  </BrowserRouter>
)
