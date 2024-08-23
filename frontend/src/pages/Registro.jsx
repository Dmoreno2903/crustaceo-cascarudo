import {useForm} from "react-hook-form"
import {Link, useNavigate} from "react-router-dom";
import '../styles/pages/Registro.css'
import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";
import toast from "react-hot-toast";

export const Registro = () => {
  
  const {setUser, USERS, CLIENT} = useContext(AuthContext)
  
    const {register, handleSubmit} = useForm()
    
    const navigate = useNavigate()
    const onSubmit = (data) =>{
      
      let newUser = {
        id:'',//numero
        type: '',
        name: '',
        username: '',
        password: '',
        email: '',
        age: '',//numero
        city: '',
        country: '',
        occupation: '',
        address: '',
        phone: '',//numero
        accountType: '', //solo ahorro o corriente
        accountNumber: '',//numero
        profilePicture: 'https://via.placeholder.com/150',
        cartItems: {
          "fries": { },
          "burguers": { },
          "drinks": { }
        }
      }
      

      const user = USERS.find(user => user.username === data.username)
      const email = USERS.find(user => user.email === data.email)

      // Verificar si el usuario ya existe
      if (user) {
        toast.error("El usuario ya existe");
      }

      // Verificar si el email ya existe
      if (email) {
        toast.error("El email ya existe");
      }

      // Verificar si las contraseñas coinciden
      if (data.password !== data.confirmPassword) {
        toast.error("Las contraseñas no coinciden")
      }

      if(!user && !email && data.password === data.confirmPassword){
        const id = CLIENT.reduce((maxId, client) => Math.max(maxId, client.id), 0)
        newUser.id = id+1
        newUser.type = "Client"
        newUser.name = `${data.firstname} ${data.lastname}`
        newUser.username = data.username
        newUser.password = data.password
        newUser.email = data.email
        
        setUser(newUser)
        navigate('/usuario')
        
      }

    }
    return (
        <div className="inicio-form-container">
          
          <div>
            
          <h1 className="inicio-titulo">Regístrate</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inicio-form-group">
              
              <input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="Nombres"
              />
            </div>
            <div className="inicio-form-group">
              
              <input
                type="text"
                {...register("lastName", { required: true })}
                placeholder="Apellidos"
              />
            </div>
            <div className="inicio-form-group">
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Correo electrónico"
              />
            </div>
            <div className="inicio-form-group">
              <input
                type="text"
                {...register("username", { required: true })}
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="inicio-form-group">
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Contraseña"
              />
            </div>
            <div className="inicio-form-group">
              <input
                type="password"
                {...register("confirmPassword", { required: true })}
                placeholder="Confirmar contraseña"
              />
            </div>
            <div className="inicio-form-group inicio-checkbox-label">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
                id="terms"
              />
              <label htmlFor="terms">Acepto las políticas de tratamiento de datos</label>
            </div>
            <button type="submit" className="submit-button">
              Registrarse
            </button>
          </form>
          </div>
          <div>
            <h4>¿Ya tienes cuenta?</h4>
            <Link className="inicio-link" to="/inicio-de-sesion">
            Iniciar sesión
            </Link>
            </div>
        </div>
      );
}


