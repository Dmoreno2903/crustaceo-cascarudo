import { createContext, useEffect, useState } from "react"
import { BURGUER, DRINK, FRIES } from "../dataMomentanea/productos"

export const AdminContext = createContext()

export const AdminContextProvider = ({children}) => {
    const [burguers, setBurguers] = useState([])
    const [fries, setFries] = useState([])
    const [drinks, setDrinks] = useState([])

    const [selectedValue, setSelectedValue] = useState('Burguers')
    
    useEffect(() => {
        setBurguers(BURGUER),
        setFries(FRIES),
        setDrinks(DRINK)
    }, [])
    
    const contextData = {
        burguers, setBurguers,
        fries, setFries,
        drinks, setDrinks,
        selectedValue, setSelectedValue
    }
  return (
    <AdminContext.Provider value={contextData}>
        {children}
    </AdminContext.Provider>
  )
}
