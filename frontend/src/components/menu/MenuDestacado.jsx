import {ListaProductosDestacados} from "./ListaProductosDestacados"
import '../../styles/menu/MenuDestacado.css'
export const MenuDestacado = () => {
  return (
    <div>
      <h1 className="titulo">Productos destacados</h1>
      <ListaProductosDestacados/>
    </div>
  )
}
