import { TarjetaProductoGeneral } from "./TarjetaProductoGeneral"
import '../../styles/menu/ListaProductosGeneral.css'
export const ListaProductosGeneral = ({listaRecortada}) => {

  
  return (
    <div className="lista-productos-general">
      {listaRecortada.map(producto=>
        <TarjetaProductoGeneral
        key={producto.id} 
        producto={producto}
        />
      )}
      
    </div>
  )
}
