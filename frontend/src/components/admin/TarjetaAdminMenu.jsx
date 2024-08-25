
import {toast} from 'react-hot-toast'
import { ToastUpdateProduct } from "./ToastUpdateProduct"
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContextProvider'

export const TarjetaAdminMenu = ({product}) => {

  const adminContext = useContext(AdminContext)
  const {selectedValue} = useContext(AdminContext)


    const handleClick = () =>{
      toast.dismiss()
      toast.custom(<ToastUpdateProduct product={product} adminContext={adminContext}/>,
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
        {selectedValue==='Burguers' && <td>{product.score}</td>}
        <td >{product.price}</td>
        <td><img src={product.image}></img></td>
        <td>{Number(product.count)}</td>
        <td>{String(product.is_outstanding)}</td>
    </tr>
    
  )
}
