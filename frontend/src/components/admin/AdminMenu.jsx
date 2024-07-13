// agregar o eliminar productos del menu, cambiar si es destacado

import { useEffect, useState } from "react"
import { BURGUER, DRINK, FRIES } from "../../dataMomentanea/productos"
import { ListaAdminMenu } from "./ListaAdminMenu"
import { Dropdown } from 'react-dropdown'
import { DropdownList } from "./DropdownList"
export const AdminMenu = () => {

  const [burguers, setBurguers] = useState(null)
  const [fries, setFries] = useState(null)
  const [drinks, setDrinks] = useState(null)

  const [selectedValue, setSelectedValue] = useState(null)
  
  useEffect(() => {
    setBurguers(BURGUER)
    setFries(FRIES)
    setDrinks(DRINK)
    setSelectedValue('Burguers')
  }, [burguers])
  
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
  else {
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
            <th>Burguer ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Score</th>
            <th>Price</th>
            <th>Image</th>
            <th>Count</th>
            <th>Is outstanding</th>
          </tr>
        </thead>
        <tbody>
          {
            menuToShow.map(burguer => 
            <ListaAdminMenu key={burguer.id} burguer={burguer}/>
          )
          }
          
        </tbody>
      </table>
    </>
    }
    </>
  )
}
