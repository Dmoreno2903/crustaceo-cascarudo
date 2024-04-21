import { ShoppingCart, UserCircle } from "phosphor-react"
import { Link } from "react-router-dom"
import "../styles/Navbar.css"
export const Navbar = () => {
  return (
    <div className="navbar">

      <Link to="/">Crustaceo cascarudo</Link>

      <div className="derecha">
        <Link to="/inicio">Inicio</Link>
        <Link to="/">Menu</Link>
        <Link to="/carrito-compras-preview">
          <ShoppingCart size={32}/>
        </Link>
        <Link to="/usuario">
          <UserCircle size={32}/>
        </Link>
      </div>
      
    </div>
  )
}
