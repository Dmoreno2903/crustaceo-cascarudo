import { BotonAgregarProducto } from "../botones/BotonAgregarProducto"
import '../../styles/menu/TarjetaProductoGeneral.css'
export const TarjetaProductoGeneral = ({producto}) => {
    return (
        <div className="tarjeta-producto-general">
          <div className="general-info-producto">
            <img className="general-image" src={producto.image}/>
            <h2 className="general-name">{producto.name}</h2>
            <p className="general-price">{producto.price}</p>
          </div>
          <BotonAgregarProducto/>
        </div>
      )
}
