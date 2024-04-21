import { useContext } from "react"
import { ImagenFondo } from "../components/menu/ImagenFondo"
import { MenuDestacado } from "../components/menu/MenuDestacado"
import { MenuGeneral } from "../components/menu/MenuGeneral"
import { AuthContext } from "../context/AuthContextProvider"


export const Menu = () => {
  const { user } = useContext(AuthContext)
  
console.log(user)
  return (
    <div>
      <ImagenFondo/>
      <MenuDestacado/>
      <MenuGeneral/>
    </div>
  )
}
