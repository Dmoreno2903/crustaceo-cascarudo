import { act } from 'react'
import { createContext, useState} from 'react'

export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState()
    const [active,setActive] = useState(
      {
        "papas": false,
        "cangreburguers": true,
        "bebidas": false
      }
    )

    const  onClick = (a) =>{
      let activeNuevo = {
        "papas": false,
        "cangreburguers": false,
        "bebidas": false
      }
      activeNuevo[a]=true
      setActive(activeNuevo)
    }

    const contextData = {
        user,
        active,
        setActive,
        onClick

    }
    
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}
