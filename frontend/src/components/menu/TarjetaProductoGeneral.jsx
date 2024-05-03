import { BotonAgregarProducto } from "../botones/BotonAgregarProducto"

export const TarjetaProductoGeneral = ({producto}) => {
    return (
        <div>
          <h2>{producto.name}</h2>
          <p>{producto.price}</p>
          <BotonAgregarProducto/>
        </div>
      )
}
