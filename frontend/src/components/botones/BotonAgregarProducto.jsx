import '../../styles/botones/BotonAgregarProducto.css'
export const BotonAgregarProducto = ({handleClick}) => {
  
  return (
    <button className='boton' onClick={handleClick}>Agregar al carrito</button>
  )
}
