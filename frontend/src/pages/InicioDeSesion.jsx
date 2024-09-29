import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import '../styles/pages/InicioDeSesion.css'
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";
import login from '../services/login';
import toast from 'react-hot-toast'

export const InicioDeSesion = () => {

    const {setUser, setToken, USERS, playAudio} = useContext(AuthContext)

    const navigate = useNavigate()

    const {register, handleSubmit, reset} = useForm()
    

    const onSubmit = async (data) => {
      if(data.username.toLowerCase().includes('plankton') || data.password.toLowerCase().includes('plankton')){
        
        playAudio();
        navigate('/login-prohibido');
        toast.error('Inicio de sesión denegado')
      }
      try {
        const tokenData = await login.getToken(data);
        console.log("Token:", tokenData);
        setToken(tokenData.access);
        navigate('/menu')
      } catch (error) {
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
          <a href="/recuperar-contrasena">¿Olvidaste tu contraseña?</a>
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