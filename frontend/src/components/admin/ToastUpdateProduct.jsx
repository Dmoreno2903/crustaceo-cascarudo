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
        <h1>Actualizar producto</h1>
        <label>Nombre: <input {...register("name", { required: "por favor ingresa nombre" })} defaultValue={product.name}/></label>
        <label>Descripción: <input {...register("description", { required: "por favor ingresa descripción" })} defaultValue={product.description}/></label>
        <label>Puntuación: <input {...register("score", { required: "por favor ingresa puntuación" })} defaultValue={product.score}/></label>
        <label>Precio: <input {...register("price", { required: "por favor ingresa precio" })} defaultValue={product.price}/></label>
        <label>Imagen: <input {...register("image", { required: "por favor ingresa imagen" })} defaultValue={product.image}/></label>
        <label>Conteo: <input {...register("count", { required: "por favor ingresa conteo" })} defaultValue={Number(product.count)}/></label>
        <label>Destacado: <input {...register("is_outstanding", { required: "por favor ingresa destacado" })} defaultValue={product.is_outstanding}/></label>
        
        
        <input type="submit"/>
        <button type="button" onClick={() => toast.dismiss(t.id)}>Cancelar</button>
    </form>
  )
}
