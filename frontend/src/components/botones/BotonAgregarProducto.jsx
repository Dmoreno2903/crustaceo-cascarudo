import { useContext } from 'react'
import '../../styles/botones/BotonAgregarProducto.css'

import toast from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContextProvider'
import { useNavigate } from 'react-router-dom'

export const BotonAgregarProducto = ({id, type}) => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleClick = () =>{
    user ? 
    toast.success(`Se agregó el producto`)
    :
    toast((t)=>{
      const navigateLogin = ()=>{
        navigate('/inicio-de-sesion')
        toast.dismiss(t.id)
      }
      const navigateRegister = ()=>{
        navigate('/registro')
        toast.dismiss(t.id)
      }
      const cancel = () =>{
        toast.dismiss(t.id)
      }
      return(
        <>
        
        <div>
          No has iniciado sesion
          <br/>
          <div>
            <button onClick={navigateLogin}>
              Iniciar sesion
            </button>
            <button onClick={navigateRegister}>
              Crear cuenta
            </button>
            <button onClick={cancel}>
              cancelar
            </button>
          </div>
        </div>
        
        </>
      )
    },
    {
      duration: 4000,
      id: 'clipboard',
    })
  }
  return (
    <button className='boton-agregar-producto' onClick={handleClick}>Agregar al carrito</button>
  )
}

