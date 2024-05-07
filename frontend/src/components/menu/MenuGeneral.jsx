import {BotonMenu} from "../botones/BotonMenu"
import { ListaProductosGeneral } from "./ListaProductosGeneral"
import Pagination from "@mui/material/Pagination"
import ListaProductos from "../../dataMomentanea/ListaProductos.json"
import { useState } from "react"
import '../../styles/menu/MenuGeneral.css'


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

  return (
    <div className="menu-general">
      <div className="botones-filtro">
        <BotonMenu name={"Papas"}/>
        <BotonMenu name={"Cangreburguers"}/>
        <BotonMenu name={"Bebidas"}/>
      </div>
      <ListaProductosGeneral listaRecortada={listaRecortada}/>
      <Pagination count={numeroPaginas} color="primary" onChange={handleChange}></Pagination>
    </div>
  )
}
