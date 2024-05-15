import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../context/AuthContextProvider"
import { BotonAgregarProducto } from "../components/botones/BotonAgregarProducto"
import '../styles/pages/Detallado.css'

export const Detallado = () => {
  const {id, product} = useParams()

  const {fries, burguers, drinks} =useContext(AuthContext)
  
  const [lista, setLista] = useState([])
  const [producto, setProducto] =useState()
  
  
  useEffect(()=>{
    if(product==="fries"){
      setLista(fries)
      
    }
    else if(product==="burguers"){
      setLista(burguers)
    }
    else if(product==="drinks"){
      setLista(drinks)
    }
    
  },[product])

  
  
  useEffect(()=>{
    const findProduct = lista.find(producto => producto.id===Number(id))
    setProducto(findProduct)
  })
  
  const handleClick = (id) =>{
    console.log(id)
  }

  return (
    <div>
      {producto && 
        <div className="tarjeta-producto-detallado">
          <img className="detallado-image" src={producto.image}/>
          <div className="detallado-info-producto">
            
            <h2 className="detallado-name">{producto.name}</h2>
            <p className="detallado-description">{producto.description}</p>
            {producto.score&&
            <p>Notas: {producto.score}</p>
            }
            <p className="detallado-price">{producto.price}</p>
            <BotonAgregarProducto handleClick={()=>handleClick(producto.id)}/>
          </div>

        </div>
      }
    </div>
  )
}
