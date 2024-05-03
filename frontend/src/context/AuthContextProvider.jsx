import { createContext, useState} from 'react'

export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState()

    const contextData = {
        user: user
    }
    
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}
