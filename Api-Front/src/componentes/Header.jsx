import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import profileUserIcon from "../assets/imagen.png";

const Header = () => {
  const { logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/catalogo">
                Catalogo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/carrito">
                🛒
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <Link className="nav-link active" aria-current="page" to="/mi-perfil">
              <img src={profileUserIcon} alt="icono" 
              style={{ width: "35px",
                marginLeft: "-70px",
                border: "1px solid white",
                padding: "5px",
                borderRadius: "20px" }} />                        
            </Link>
          </div>
          <button
            className="btn btn-danger"
            onClick={handleLogOut}
            type="button"
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;