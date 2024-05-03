import { ShoppingCart, UserCircle } from "phosphor-react"
import { Link } from "react-router-dom"
import "../styles/Navbar.css"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContextProvider"
export const Navbar = () => {
  
  const {user} = useContext(AuthContext)


  console.log("navbar user", user)
  return (
    <div className="navbar">

      <Link to="/">Crustaceo cascarudo</Link>

      <div className="derecha">
        <Link to="/">Menu</Link>
        { !user && 
        <>
          <Link to="/registro">Crea tu cuenta</Link>
          <Link to="/inicio-de-sesion">Ingresa</Link>
        </>

        }
        { user && 
        <>
          <Link to="/usuario">
            <UserCircle size={32}/>
          </Link>
        </>

        }
        <Link to="/carrito-compras-preview">
            <ShoppingCart size={32}/>
        </Link>

        
        
      </div>
      
    </div>
  )
}
