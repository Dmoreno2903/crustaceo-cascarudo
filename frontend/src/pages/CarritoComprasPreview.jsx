import { useContext } from "react"
import { AuthContext } from "../context/AuthContextProvider"

export const CarritoComprasPreview = () => {
  const {cartItems, fries, burguers, drinks} =useContext(AuthContext)
  console.log(cartItems)
  let burguersCart = cartItems['burguers']
  let friesCart = cartItems['fries']
  let drinksCart = cartItems['drinks']

  console.log(Object.keys(burguersCart))
  
  return (
    <div>
      <p>CarritoComprasPreview</p>
      <h3>Burguers</h3>
      {Object.keys(burguersCart).map(key=>
        <div key={key}>Burguer con id: {key};  cantidad: {burguersCart[key]}</div>
      )}
      <h3>Fries</h3>
      {Object.keys(friesCart).map(key=>
        <div key={key}>Fries con id: {key};  cantidad: {friesCart[key]}</div>
      )}
      <h3>Drinks</h3>
      {Object.keys(drinksCart).map(key=>
        <div key={key}>Drink con id: {key};  cantidad: {drinksCart[key]}</div>
      )}

      
    </div>
  )
}

