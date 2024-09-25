import { BotonAgregarProducto } from "../botones/BotonAgregarProducto"
import '../../styles/menu/TarjetaProductoGeneral.css'
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContextProvider"
export const TarjetaProductoGeneral = ({producto}) => {
  
  const {selectedList} = useContext(AuthContext)

  
  const navigate = useNavigate()
    
    

    const handleInfoClick = (id)=>{
      navigate(`/detallado/${selectedList}/${id}`)
    }
    return (
        <div className="tarjeta-producto-general">
          <div className="general-info-producto" onClick={()=>handleInfoClick(producto.id)}>
            <img className="general-image" src={`http://localhost:8000${producto.image}`}/>
            <h2 className="general-name">{producto.name}</h2>
            <p className="general-price">${producto.price.toLocaleString("es-CO"
                    )}</p>
          </div>
          <BotonAgregarProducto productId={producto.id} selectedList={selectedList} />
        </div>
      )
}
