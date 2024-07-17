import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export const ToastAddProduct = ({ adminContext, authContext, t }) => {
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

      const lastObject = list[list.length-1]
      
      const newObject = {}
      newObject.id = lastObject.id + 1
      newObject.name = data.name
      newObject.price = data.price
      newObject.description = data.description
      if(selectedValue==='Burguers'){
        newObject.score = data.score
      }
      newObject.image = URL.createObjectURL(data.image[0])
      newObject.count = String(data.count)
      newObject.is_outstanding = Boolean(data.is_outstanding)
      if(selectedValue==='Burguers'){
        const newList = [...list, newObject]
        setBurguers(newList)
        authContext.setBurguers(newList)
      }
      else if(selectedValue==='Drinks'){
        const newList = [...list, newObject]
        setDrinks(newList)
        authContext.setDrinks(newList)
      }
      else if(selectedValue==='Fries'){
        const newList = [...list, newObject]
        setFries(newList)
        authContext.setFries(newList)
      }
        
        toast.dismiss(t.id)
    }
    
    
    

  return (
    <form onSubmit={
      handleSubmit(
        onSubmit
        )}>
        <h1>Agregar {labelToShow} {labelToShow}</h1>
        <label>Nombre: <input {...register("name", { required: "por favor ingresa nombre" })} /></label>
        <label>Descripción: <input {...register("description", { required: "por favor ingresa descripción" })} /></label>
        {selectedValue==='Burguers' && <label>Puntuación: <input {...register("score", { required: "por favor ingresa puntuación" })} /></label>}
        <label>Precio: <input {...register("price", { required: "por favor ingresa precio" })} /></label>
        <label>Imagen: <input type='file' {...register("image", { required: "por favor ingresa imagen" })} /></label>
        <label>Conteo: <input {...register("count", { required: "por favor ingresa conteo" })} /></label>
        <label>Destacado: 
          <select {...register("is_outstanding", { required: "por favor ingresa destacado" })} >
            <option value = {true}>true</option>
            <option value = {false}>false</option>

          </select>
        </label>
        
        
        <input type="submit"/>
        <button type="button" onClick={() => toast.dismiss(t.id)}>Cancelar</button>
    </form>
  )
}

