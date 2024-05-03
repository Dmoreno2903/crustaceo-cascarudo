import ListaProductos from "../../dataMomentanea/ListaProductos.json"
import { TarjetaProductoDestacado } from "./TarjetaProductoDestacado"


export const ListaProductosDestacados = () => {
  const listaOrdenada = ListaProductos.filter(producto=>producto.is_outstanding)
  const listaRecortada = listaOrdenada.slice(0,2)

  
  return (
    <div>
      {listaRecortada.map(producto=>(
        <TarjetaProductoDestacado
        key={producto.id} 
        producto={producto}
        />
      ))}
    </div>
  )
}
