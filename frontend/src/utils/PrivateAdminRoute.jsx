import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider'

export const PrivateAdminRoute = ({children}) => {
    const { user } = useContext(AuthContext)
    
    return (
      (user && user.type==='Administrator') ? children : <Navigate to='/'/>
    )
}
