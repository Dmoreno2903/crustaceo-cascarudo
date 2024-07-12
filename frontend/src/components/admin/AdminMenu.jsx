// agregar o eliminar productos del menu, cambiar si es destacado

import { useEffect, useState } from "react"
import { BURGUER } from "../../dataMomentanea/productos"
import { ListaAdminMenu } from "./ListaAdminMenu"

export const AdminMenu = () => {

  const [burguers, setBurguers] = useState(BURGUER)
  const [fries, setFries] = useState(null)
  const [drinks, setDrinks] = useState(null)

  useEffect(() => {
    setBurguers(BURGUER)
  })

  console.log(burguers)

  return (
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
            burguers.map(burguer => <ListaAdminMenu key={burguer.id} burguer={burguer}/>
            )
          }
          
        </tbody>
      </table>
  )
}
