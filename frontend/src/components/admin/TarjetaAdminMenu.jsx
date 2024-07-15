
import {toast} from 'react-hot-toast'
import { ToastUpdateProduct } from "./ToastUpdateProduct"
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContextProvider'

export const TarjetaAdminMenu = ({product}) => {

  const adminContext = useContext(AdminContext)
  
  

    const handleClick = () =>{
      toast((t)=>{
        return(
          <ToastUpdateProduct product={product} adminContext={adminContext} t={t} />
        )
      },
      {
        duration: Infinity
      }
        
      )
    }
  return (
    <tr onClick = {handleClick}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.score}</td>
        <td >{product.price}</td>
        <td><img src={product.image}></img></td>
        <td>{Number(product.count)}</td>
        <td>{String(product.is_outstanding)}</td>
    </tr>
    
  )
}
