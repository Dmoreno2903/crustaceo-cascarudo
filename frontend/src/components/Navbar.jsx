import { Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { UserCircle, Money, Notebook} from "phosphor-react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useContext} from "react";
import { AuthContext } from "../context/AuthContextProvider";
import logo from '/src/assets/imagenes/logo.jpg';
import SearchBar from "./SearchBar";

export const Navbar = () => {
  const { user, setUser, cartItems } = useContext(AuthContext);

  // Calcula la cantidad total de productos en el carrito
  const getTotalItems = () => {
    return Object.values(cartItems).reduce((total, categoryItems) => {
      return total + Object.values(categoryItems).reduce((sum, quantity) => sum + quantity, 0);
    }, 0);
  }

  // Cerrar sesión
  const signOut = () => {
    setUser(null)
    localStorage.removeItem('username')
  }

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <div>
            <img className="navbar-logo" src={logo} alt="Logo" />
          </div>
          <div>Crustáceo cascarudo</div>
        </Link>
      </div>
      
      <div className="right">
        <SearchBar/>
        <div className="right-buttons">
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
          {(!user || user.type === 'Client') && (
            <Link to="/carrito-compras-preview">
              <Badge badgeContent={getTotalItems()} color="primary">
                <ShoppingCart color="action" />
              </Badge>
            </Link>
          )}
          {user && user.type === 'Administrator' && (
            <>
              <Link to='/admin'>
                <Notebook size={32} />
              </Link>
              <Link to="/admin/facturas">
                <Money size={32}/>
              </Link>
            </>
          )}
          {user && (<Link to='/menu'>
            <div onClick={signOut}>
              Cerrar sesion
            </div>
          </Link>
          )}
        </div>
        
        
      </div>
    </div>
  );
};
