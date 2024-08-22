import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import '../styles/pages/InicioDeSesion.css'
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";
import {CLIENT, ADMINISTRATOR} from '../dataMomentanea/users'// base de datos estatica, luego hay que cambiarlo
import toast from 'react-hot-toast'

export const InicioDeSesion = () => {

    const {setUser} = useContext(AuthContext)

    const USERS = [
      ...CLIENT,
      ...ADMINISTRATOR
    ]
    const navigate = useNavigate()

    const {register, handleSubmit, reset} = useForm()

    const onSubmit = (data) => {
      const user = USERS.find(client => client.username === data.username)
      let { password, ...copyUser } = user
      if(user && user.password===data.password){
        setUser(copyUser)
        navigate('/menu')
        sessionStorage.setItem('username', JSON.stringify(user.username))
        toast.success(`Sesion iniciada, hola ${user.name}`)
      }
      else{
        reset()
        toast.error("Acceso denegado, el usuario o la contraseña fueron mal ingresadas o no se ha registrado")
      }
    }
    return (
        <div className="form-container">
          
          <div>
            
          <h1 className="titulo">Iniciar sesión</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="form-group">
        
              <input
                type="text"
                {...register("username", { required: true })}
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Contraseña"
              />
            </div>
            
            <button type="submit" className="submit-button">
              Ingresar
            </button>
          </form>
          </div>
          <a href="">¿Olvidaste tu contraseña?</a>
          <br></br>
          <div>
            <h4>¿No tienes cuenta?</h4>
            <Link className="link" to="/registro">
            Regístrate
            </Link>
            </div>
        </div>
      );
}