import {BotonMenu} from "../botones/BotonMenu"
import { ListaProductosGeneral } from "./ListaProductosGeneral"
import Pagination from "@mui/material/Pagination"
import ListaProductos from "../../dataMomentanea/ListaProductos.json"
import { useContext, useState } from "react"
import '../../styles/menu/MenuGeneral.css'
import { AuthContext } from "../../context/AuthContextProvider"


export const MenuGeneral = () => {

  // Calcula el numero de paginas necesarias para la paginacion, siempre calcula por encima por si sobran productos
  const numeroPaginas = Math.ceil(ListaProductos.length/6)
  
  // Indices de la lista recortada
  const [indiceInicio, setIndiceInicio] = useState(0)
  const [indiceFinal, setIndiceFinal] = useState(6)

  // Lista con los elementos que se mostraran
  const listaRecortada = ListaProductos.slice(indiceInicio,indiceFinal)
  
  
  const handleChange = (event,currentPage)=>{
    const numeroActual = currentPage-1
    
    setIndiceInicio(numeroActual*6)
    setIndiceFinal(numeroActual*6+6)
  }
  
  const {active, onClick} = useContext(AuthContext)
  
  return (
    <div className="menu-general">
      <h1 className="titulo">Menu</h1>
      <div className="botones-filtro">
        <BotonMenu name={"Papas"} currentActive = {active.papas} onClick={()=>onClick("papas")}/>
        <BotonMenu name={"Cangreburguers"} currentActive = {active.cangreburguers} onClick={()=>onClick("cangreburguers")}/>
        <BotonMenu name={"Bebidas"} currentActive = {active.bebidas} onClick={()=>onClick("bebidas")}/>
      </div>
      <ListaProductosGeneral listaRecortada={listaRecortada}/>
      <Pagination className="pagination" count={numeroPaginas} color="primary" onChange={handleChange}></Pagination>
    </div>
  )
}
