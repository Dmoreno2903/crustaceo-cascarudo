import { BotonCambiarPagina } from "../botones/BotonCambiarPagina"
import {BotonMenu} from "../botones/BotonMenu"
import { ListaProductosGeneral } from "./ListaProductosGeneral"

export const MenuGeneral = () => {
  return (
    <div>
      <div>
        <BotonMenu name={"Papas"}/>
        <BotonMenu name={"Cangreburguers"}/>
        <BotonMenu name={"Bebidas"}/>
      </div>
      <ListaProductosGeneral/>
      <BotonCambiarPagina/>
    </div>
  )
}
