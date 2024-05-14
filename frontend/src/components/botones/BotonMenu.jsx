
import '../../styles/botones/BotonMenu.css'
export const BotonMenu = ({name, currentActive, onClick}) => {
  
  
  return (
    <button className={`boton-menu ${currentActive? "active":""}`} onClick={onClick}>{name}</button>
  )
}
