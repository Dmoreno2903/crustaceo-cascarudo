import { BotonAgregarProducto } from "../botones/BotonAgregarProducto"

export const TarjetaProductoGeneral = ({producto}) => {
    return (
        <div>
          <h2>{producto.nombre}</h2>
          <p>{producto.precio}</p>
          <BotonAgregarProducto/>
        </div>
      )
}
