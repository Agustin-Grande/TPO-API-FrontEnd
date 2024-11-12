
import { createRoot } from 'react-dom/client'
import './index.css'
//import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from './rutas/AppRoutes.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { VistosProvider } from './context/VistosContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <VistosProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </VistosProvider>
  </BrowserRouter>
);
