// agregar o eliminar productos del menu, cambiar si es destacado

import { useContext } from "react"
import { TarjetaAdminMenu } from "./TarjetaAdminMenu"
import { DropdownList } from "./DropdownList"
import { AdminContext } from "../../context/AdminContextProvider"
export const AdminMenu = () => {

  const {
    burguers,
    fries,
    drinks,
    selectedValue, setSelectedValue
  } = useContext(AdminContext)
  
  
  
  const options = [
    { value: 'Burguers', label: ' Burguers ' }, 
    { value: 'Fries', label: ' Fries ' }, 
    { value: 'Drinks', label: ' Drinks ' }, 
  ]

  let menuToShow = null
  if(selectedValue==='Burguers'){
    menuToShow= burguers
  }
  else if (selectedValue === 'Fries'){
    menuToShow= fries
  }
  else if(selectedValue==='Drinks'){
    menuToShow=drinks
  }

  return (
    <>
    {burguers && fries && drinks && menuToShow &&
      <>
      <DropdownList selectedValue={selectedValue} setSelectedValue={setSelectedValue} options={options}/>
      <table>
        <thead>
          <tr>
            <th>{selectedValue} ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Puntuación</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Conteo</th>
            <th>Destacado</th>
          </tr>
        </thead>
        <tbody>
          {
            menuToShow.map(product => 
            <TarjetaAdminMenu key={product.id} product={product} selectedValue={selectedValue}/>
          )
          }
          
        </tbody>
      </table>
    </>
    }
    </>
  )
}
