
import { createContext, useEffect, useState} from 'react'
import { BURGUER, FRIES, DRINK } from '../dataMomentanea/productos'
import burguerService from '../services/burguers'
export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({type: 'Administrator'})
    const [cartItems, setCartItems] = useState({
      "fries":{1:4},
      "burguers":{2:4,23:5},
      "drinks":{1:3}
    })
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
    const [backendBurguers, setBackendBurguers] = useState([])
    const [backendBurguersOut, setBackendBurguersOut] = useState([])

    // useEffect(() => {
    //   burguerService
    //     .getAll()
    //     .then(burguers => {
    //       setBackendBurguers(burguers)
    //     })
        
    //   burguerService
    //     .getOutstandingBurguers()
    //     .then(burguers => {
    //       setBackendBurguersOut(burguers)
    //     })
    // }, [])

    const contextData = {
        user,
        active,
        setActive,
        onClick,
        burguers,
        fries,
        drinks,
        menuToShow,
        selectedList,
        cartItems,
        setCartItems
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
