import '../../styles/botones/BotonAgregarProducto.css'
export const BotonAgregarProducto = ({handleClick}) => {
  
  return (
    <button className='boton-agregar-producto' onClick={handleClick}>Agregar al carrito</button>
  )
}
