import { BotonAgregarProducto } from "../botones/BotonAgregarProducto"

export const TarjetaProductoDestacado = ({producto}) => {
  return (
    <div>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p>{producto.precio}</p>
      <BotonAgregarProducto/>
    </div>
  )
}
