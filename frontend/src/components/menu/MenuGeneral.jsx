import {BotonMenu} from "../botones/BotonMenu"
import { ListaProductosGeneral } from "./ListaProductosGeneral"
import Pagination from "@mui/material/Pagination"
import { useContext, useEffect, useState } from "react"
import '../../styles/menu/MenuGeneral.css'
import { AuthContext } from "../../context/AuthContextProvider"


export const MenuGeneral = () => {
  const {active, onClick, menuToShow} = useContext(AuthContext)

  
  // Calcula el numero de paginas necesarias para la paginacion, siempre calcula por encima por si sobran productos
  const numeroPaginas = Math.ceil(menuToShow.length/6)
  
  // Indices de la lista recortada
  const [indiceInicio, setIndiceInicio] = useState(0)
  const [indiceFinal, setIndiceFinal] = useState(6)
  const [page, setPage] = useState(1)
  // Lista con los elementos que se mostraran
  const listaRecortada = menuToShow.slice(indiceInicio,indiceFinal)

  useEffect(() => {
    setPage(1)
    setIndiceInicio(0)
    setIndiceFinal(6)
  }, [menuToShow]);

  const handleChange = (event,currentPage)=>{
    const numeroActual = currentPage-1
    
    setIndiceInicio(numeroActual*6)
    setIndiceFinal(numeroActual*6+6)
    setPage(currentPage)
  }
  
  
  return (
    <div className="menu-general">
      <h1 className="titulo">Menu</h1>
      <div className="botones-filtro">
        <BotonMenu name={"Papas"} currentActive = {active.fries} onClick={()=>onClick("fries")}/>
        <BotonMenu name={"Cangreburguers"} currentActive = {active.burguers} onClick={()=>onClick("burguers")}/>
        <BotonMenu name={"Bebidas"} currentActive = {active.drinks} onClick={()=>onClick("drinks")}/>
      </div>
      <ListaProductosGeneral listaRecortada={listaRecortada}/>
      <Pagination className="pagination" page={page} count={numeroPaginas} color="primary" onChange={handleChange}></Pagination>
    </div>
  )
}
