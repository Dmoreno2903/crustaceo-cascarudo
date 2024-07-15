import toast from "react-hot-toast"
import { BURGUER, FRIES, DRINK } from "../../dataMomentanea/productos"
import {useForm} from "react-hook-form"

export const ToastUpdateProduct = ({product, adminContext, t}) => {
    const { register, handleSubmit } = useForm()
    
    const { 
      burguers, setBurguers,
      fries, setFries,
      drinks, setDrinks,
      selectedValue, setSelectedValue
     } = adminContext;
    
    
   
    const onSubmit = (data) => {
      if(selectedValue==='Burguers'){

        const objeto = burguers.find(objeto =>objeto.id === product.id)
        objeto.name = data.name
        const newList = burguers.map(burguer => burguer.id !== product.id ? burguer:objeto)
        setBurguers(newList)
      }
      else if(selectedValue==='Drinks'){
        const objeto = drinks.find(objeto =>objeto.id === product.id)
        objeto.name = data.name
        const newList = drinks.map(drink => drink.id !== product.id ? drink:objeto)
        setDrinks(newList)
      }
      else if(selectedValue==='Fries'){
        const objeto = fries.find(objeto =>objeto.id === product.id)
        objeto.name = data.name
        const newList = fries.map(fries => fries.id !== product.id ? fries:objeto)
        setFries(newList)
      }
        
        toast.dismiss(t.id)
    }

    

  return (
    <form onSubmit={
      handleSubmit(
        onSubmit
        )}>
        <label>name: <input {...register("name", { required: "por favor ingresa nombre" })} defaultValue={product.name}/></label>
        
        <input type="submit"/>
        <button type="button" onClick={() => toast.dismiss(t.id)}>Cancelar</button>
    </form>
  )
}
