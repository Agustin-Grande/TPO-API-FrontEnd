import { Routes, Route } from 'react-router-dom';
import Login from "../pages/Login";
import Registro from "../pages/Registro";

const AppRoutes = () => {
    //agregar header, nav y footer como fijo
    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                </Routes>
            </div>
        </>
    );
};

export default AppRoutes;
