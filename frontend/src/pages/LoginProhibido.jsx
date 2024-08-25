import { useEffect } from 'react';
import mrKrab from '../assets/imagenes/mrKrabSad.gif'
import sadSong from '../assets/sounds/sadSong.m4a'

//Le afectan los estilos de confirmacion carrito compra
const LoginProhibido = () => {

  return (
    <div className="carrito-check">
      <div className="image">
        <img src={mrKrab} alt="jajaj F plankton" />
      </div>
      <div className="message">
        <h1>¡Aww pobresito Plankton, tienes prohibida la entrada!</h1>
      </div>
    </div>
  )
}

export default LoginProhibido