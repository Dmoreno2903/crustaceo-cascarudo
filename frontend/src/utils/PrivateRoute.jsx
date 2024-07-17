import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'


export const PrivateRoute = ({children}) => {
    const { user } = useContext(AuthContext)

  return (
    user ? children : <Navigate to='/inicio-de-sesion'/>
  )
  
}
