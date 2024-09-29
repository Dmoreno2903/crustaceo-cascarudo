import { useContext, useEffect } from 'react'
import '../../styles/botones/BotonAgregarProducto.css'

import toast from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContextProvider'
import userService from '../../services/user'
import products from '../../services/products'
export const BotonAgregarProducto = ({productId}) => {
  const {user, token, cartItems, setCartItems, redirectToast} = useContext(AuthContext)
  
  
  
  const execute = async () => {
    console.log(cartItems);
    try {
      
        // Prepara los productos para enviar en el formato correcto
        const products = {
            products: {
                ...cartItems.products,
                [productId]: (cartItems.products[productId] || 0) + 1
            }
        };
        
        // Llama a userService.addCartItems para agregar el producto al carrito
        const updatedCartItems = await userService.addCartItems(token, products);
        console.log(updatedCartItems);
        // Actualiza el estado del carrito con los nuevos items
        setCartItems(updatedCartItems);

        toast.success(`Se agregaron los productos al carrito`);
    } catch (error) {
        toast.error(`Error al agregar los productos: ${error.message}`);
    }
  };
  
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

