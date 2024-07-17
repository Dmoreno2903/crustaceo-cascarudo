import toast from "react-hot-toast"
import { BURGUER, FRIES, DRINK } from "../../dataMomentanea/productos"
import {useForm} from "react-hook-form"

export const ToastUpdateProduct = ({product, adminContext, t}) => {
    const { register, handleSubmit } = useForm()
    
    const { 
      burguers, setBurguers,
      fries, setFries,
      drinks, setDrinks,
      selectedValue
     } = adminContext

    let labelToShow = null
    if(selectedValue==='Burguers'){
      labelToShow = 'Hamburguesa'
    }
    else if(selectedValue==='Fries'){
      labelToShow = 'Papas'
    }
    else if(selectedValue==='Drinks'){
      labelToShow = 'Bebida'
    }
   
    const onSubmit = (data) => {
      let list = null
      if(selectedValue==='Burguers'){
        list = burguers
        
      }
      else if(selectedValue==='Drinks'){
        list = drinks
      }
      else if(selectedValue==='Fries'){
        list = fries
      }

      const objeto = list.find(objeto =>objeto.id === product.id)
      objeto.name = data.name
      objeto.description = data.description
      if(selectedValue==='Burguers'){
        objeto.score = data.score
      }
      objeto.price = data.price
      objeto.image = URL.createObjectURL(data.image[0])
      objeto.count = data.count
      objeto.is_outstanding = data.is_outstanding
      
      if(selectedValue==='Burguers'){
        const newList = list.map(burguer => burguer.id !== product.id ? burguer:objeto)
        setBurguers(newList)
      }
      else if(selectedValue==='Drinks'){
        const newList = list.map(drink => drink.id !== product.id ? drink:objeto)
        setDrinks(newList)
      }
      else if(selectedValue==='Fries'){
        const newList = list.map(fries => fries.id !== product.id ? fries:objeto)
        setFries(newList)
      }
        
        toast.dismiss(t.id)
    }

    

  return (
    <form onSubmit={
      handleSubmit(
        onSubmit
        )}>
        <h1>Actualizar {labelToShow} con id {product.id}</h1>
        <label>Nombre: <input {...register("name", { required: "por favor ingresa nombre" })} defaultValue={product.name}/></label>
        <label>Descripción: <input {...register("description", { required: "por favor ingresa descripción" })} defaultValue={product.description}/></label>
        {selectedValue==='Burguers' && <label>Puntuación: <input {...register("score", { required: "por favor ingresa puntuación" })} defaultValue={product.score}/></label>}
        <label>Precio: <input {...register("price", { required: "por favor ingresa precio" })} defaultValue={product.price}/></label>
        <label>Imagen: <input type='file' {...register("image", { required: "por favor ingresa imagen" })} /></label>
        <label>Conteo: <input {...register("count", { required: "por favor ingresa conteo" })} defaultValue={Number(product.count)}/></label>
        <label>Destacado: 
          <select {...register("is_outstanding", { required: "por favor ingresa destacado" })} defaultValue={product.is_outstanding}>
            <option value = {true}>true</option>
            <option value = {false}>false</option>

          </select>
        </label>
        
        
        <input type="submit"/>
        <button type="button" onClick={() => toast.dismiss(t.id)}>Cancelar</button>
    </form>
  )
}
