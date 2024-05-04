import { TarjetaProductoGeneral } from "./TarjetaProductoGeneral"

export const ListaProductosGeneral = ({listaRecortada}) => {

  
  return (
    <div>
      {listaRecortada.map(producto=>
        <TarjetaProductoGeneral
        key={producto.id} 
        producto={producto}
        />
      )}
      
    </div>
  )
}
