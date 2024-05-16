
import { createContext, useEffect, useState} from 'react'
import { BURGUER, FRIES, DRINK } from '../dataMomentanea/productos'

export const AuthContext = createContext()

const getDefaultCart = () =>{
  let burguerCart = {}
  let friesCart = {}
  let drinksCart = {}
  
  BURGUER
  .map(producto=>producto.id)
  .forEach(id=>{
    burguerCart[id]=0
  })

  FRIES
  .map(producto=>producto.id)
  .forEach(id=>{
    friesCart[id]=0
  })

  DRINK
  .map(producto=>producto.id)
  .forEach(id=>{
    drinksCart[id]=0
  })
    
  
  
  

  return {burguerCart,friesCart, drinksCart}
}

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const [burguers, setBurguers] = useState(BURGUER)
    const [fries, setFries] = useState(FRIES)
    const [drinks, setDrinks] = useState(DRINK)
    const [menuToShow, setMenuToShow] = useState([])
    const [selectedList, setSelectedList] = useState('')
    const [active,setActive] = useState(
      {
        "fries": false,
        "burguers": true,
        "drinks": false
      }
    )
    const  onClick = (a) =>{
      let activeNuevo = {
        "fries": false,
        "burguers": false,
        "drinks": false
      }
      activeNuevo[a]=true
      setActive(activeNuevo)
    }


    const contextData = {
        user,
        active,
        setActive,
        onClick,
        burguers,
        fries,
        drinks,
        menuToShow,
        selectedList
    }
    
    useEffect(()=>{
      const selectedList = Object.keys(active).find(prop=>active[prop])
      if(selectedList==="fries"){
        setMenuToShow(fries)
        setSelectedList("fries")
      }
      else if (selectedList==="burguers"){
        setMenuToShow(burguers)
        setSelectedList("burguers")
      }
      else if (selectedList==="drinks"){
        setMenuToShow(drinks)
        setSelectedList("drinks")
      }
    },[active])

    

    
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}
