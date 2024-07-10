import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { UserCircle } from "phosphor-react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import logo from '/src/assets/imagenes/logo.jpg';

export const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="izquierda">
        <Link to="/">
          <div>
            <img className="navbar-logo" src={logo} alt="Logo" />
          </div>
          <div>Crustáceo cascarudo</div>
        </Link>
      </div>

      <input className="barra-busqueda" placeholder="Buscar productos..." />

      <div className="derecha">
        <Link to="/">Menu</Link>
        {!user && (
          <>
            <Link to="/registro">Crea tu cuenta</Link>
            <Link to="/inicio-de-sesion">Ingresa</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/usuario">
              <UserCircle size={32} />
            </Link>
          </>
        )}
        <Link to="/carrito-compras-preview">
          <Badge badgeContent={1} color="primary">
            <ShoppingCart color="action" />
          </Badge>
        </Link>
      </div>
    </div>
  );
};
