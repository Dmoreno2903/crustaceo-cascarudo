import ListaProductos from "../../dataMomentanea/ListaProductos.json"
import { TarjetaProductoGeneral } from "./TarjetaProductoGeneral"

export const ListaProductosGeneral = () => {
  const listaRecortada = ListaProductos.slice(0,6)
  return (
    <div>
      {listaRecortada.map(producto=>
        <TarjetaProductoGeneral
        key={producto.id} 
        producto={producto} 
        tipoLista={"general"}
        />
      )}
    </div>
  )
}
