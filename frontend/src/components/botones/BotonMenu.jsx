
import '../../styles/botones/BotonMenu.css'
// este boton es el que aparece en el menu para cambiar entre burguers, fries y drinks
export const BotonMenu = ({name, currentActive, onClick}) => {
  
  
  return (
    <button className={`boton-menu ${currentActive? "active":""}`} onClick={onClick}>{name}</button>
  )
}
