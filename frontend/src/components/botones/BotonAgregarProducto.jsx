import { useContext } from 'react'
import '../../styles/botones/BotonAgregarProducto.css'

import toast from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContextProvider'
import { useNavigate } from 'react-router-dom'
import RedirectToast from './RedirectToast'

export const BotonAgregarProducto = ({productId, selectedList}) => {
  const {user, cartItems, setCartItems, redirectToast} = useContext(AuthContext)
  const navigate = useNavigate()
  const execute = ()=>{
    productId = String(productId)
    let copyCartItems = { ...cartItems }
    if(!Object.keys(cartItems[selectedList]).includes(productId)){
      copyCartItems[selectedList][productId] = 1
      setCartItems(copyCartItems)
    }
    else {
      copyCartItems[selectedList][productId]=cartItems[selectedList][productId]+1
      setCartItems(copyCartItems)
    }
    toast.success(`Se agregó el producto`)
  }
  const handleClick = () =>{
    user ? 
    execute()
    :
    redirectToast()
    
  }
  return (
    <button className='boton-agregar-producto' onClick={handleClick}>Agregar al carrito</button>
  )
}

