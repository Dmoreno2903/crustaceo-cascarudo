
import { TarjetaProductoDestacado } from "./TarjetaProductoDestacado"
import '../../styles/menu/ListaProductosDestacados.css'
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContextProvider"

export const ListaProductosDestacados = () => {
  const {burguers} = useContext(AuthContext)
  
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
