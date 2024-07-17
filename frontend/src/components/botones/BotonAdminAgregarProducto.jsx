import { useContext } from "react"
import { AdminContext } from "../../context/AdminContextProvider"
import { ToastAddProduct } from "../admin/ToastAddProduct"
import toast from "react-hot-toast"
import { AuthContext } from "../../context/AuthContextProvider"

export const BotonAdminAgregarProducto = () => {
  
  const {
    selectedValue
  } = useContext(AdminContext)

  const adminContext =useContext(AdminContext)
  const authContext = useContext(AuthContext)
  
  let wordToShow = null

  if(selectedValue==='Burguers'){
    wordToShow = 'nueva hamburguesa'
  }
  else if (selectedValue==='Fries'){
    wordToShow = 'nuevas papas'
  }
  else if (selectedValue==='Drinks'){
    wordToShow = 'nueva bebida'
  }

  const handleClick = () =>{
    toast.dismiss()
    toast((t)=>{
      return(
        <ToastAddProduct adminContext={adminContext} authContext={authContext} t={t}/>
      )
    },
    {
      duration: Infinity
    })
  }
  return (
    <button onClick={handleClick}>Agregar {wordToShow} al menú</button>
  )
}

