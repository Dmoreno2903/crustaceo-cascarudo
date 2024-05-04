import { BotonAgregarProducto } from "../botones/BotonAgregarProducto"

export const TarjetaProductoDestacado = ({producto}) => {
  return (
    <div>
      <h2>{producto.name}</h2>
      <p>{producto.description}</p>
      <p>{producto.price}</p>
      <BotonAgregarProducto/>
    </div>
  )
}
