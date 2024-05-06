import { BotonAgregarProducto } from "../botones/BotonAgregarProducto"
import '../../styles/menu/TarjetaProductoDestacado.css'
export const TarjetaProductoDestacado = ({producto}) => {
  
  const handleClick = (id)=>{
    console.log(id)
  }

  return (
    <div className="tarjeta-producto-destacado">
      <div className="info-producto">
        <img className="image" src={producto.image}/>
        <h2 className="name">{producto.name}</h2>
        <p className="description">{producto.description}</p>
        <p className="price">{producto.price}</p>
      </div>
      <BotonAgregarProducto handleClick={()=>handleClick(producto.id)}/>
    </div>
  )
}
