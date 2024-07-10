import { useContext } from "react"
import { CarritoContext } from "../context/CarritoContext"
import "../styles/pages/CarritoComprasPreview.css";
import { AuthContext } from "../context/AuthContextProvider"

export const CarritoComprasPreview = () => {
  //cartItems es un objeto que tiene claves(keys) "burguers", "fries" y "drinks" los cuales a su vez tienen objetos con claves("keys") con los ids de los productos y el valor son las cantidades
  const {cartItems, fries, burguers, drinks} =useContext(AuthContext)
  
  //aqui separo el carrito de compras por productos
  //este objeto tiene las claves(keys) igual a id y el valor(value) igual a cantidad de las burguers
  let burguersCart = cartItems['burguers']
  //este objeto tiene las claves(keys) igual a id y el valor(value) igual a cantidad de las fries
  let friesCart = cartItems['fries']
  //este objeto tiene las claves(keys) igual a id y el valor(value) igual a cantidad de las drinks
  let drinksCart = cartItems['drinks']

  console.log(Object.keys(burguersCart))
  
  return (
    <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
               
            </table>
            <div className="d-flex justify-content-center">
                <button 
                className="btn btn-primary w-25"
                >Comprar</button>
            </div>





            <br/>
            <div>
              {/* esto lo agregue como una guia*/}
              <p>IDs de productos y cantidades</p>
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
        </>
    
  )
}

