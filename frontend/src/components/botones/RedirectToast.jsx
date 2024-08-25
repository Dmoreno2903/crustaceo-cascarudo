import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const RedirectToast = () => {
    const navigate = useNavigate()
    
    const navigateLogin = (id)=>{
        navigate('/inicio-de-sesion')
        toast.dismiss(id)
    }
    
    const navigateRegister = (id)=>{
        navigate('/registro')
        toast.dismiss(id)
    }
    
    const cancel = (id) =>{
        toast.dismiss(id)
    }
    return toast.success("Hola")
}

export default RedirectToast