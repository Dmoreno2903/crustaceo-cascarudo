import { BotonAgregarProducto } from "../botones/BotonAgregarProducto"
import '../../styles/menu/TarjetaProductoDestacado.css'
export const TarjetaProductoDestacado = ({producto}) => {
  return (
    <div className="tarjeta-producto-destacado">
      
      <img className="image" src={producto.image}/>
      <h2 className="name">{producto.name}</h2>
      <p className="description">{producto.description}</p>
      <p className="price">{producto.price}</p>
      <BotonAgregarProducto/>
    </div>
  )
}
