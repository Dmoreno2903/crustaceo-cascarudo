
import { TarjetaProductoDestacado } from "./TarjetaProductoDestacado"
import '../../styles/menu/ListaProductosDestacados.css'
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContextProvider"

export const ListaProductosDestacados = () => {
  const {burguers} = useContext(AuthContext)
  
  // Verificar si burguers está disponible
  if (!burguers) {
    return null; // No renderizar nada si burguers no está disponible
  }
  
  const listaOrdenada = burguers.filter(producto=>producto.is_outstanding)
  const listaRecortada = listaOrdenada.slice(0,2)

  
  
  
  return (
    <div className="productos-destacados">
      {listaRecortada.map(producto=>(
        <TarjetaProductoDestacado
        key={producto.id} 
        producto={producto}
        />
      ))}
    </div>
  )
}
