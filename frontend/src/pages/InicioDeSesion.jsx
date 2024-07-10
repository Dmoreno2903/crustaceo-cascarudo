import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import '../styles/pages/InicioDeSesion.css'

export const InicioDeSesion = () => {

    
    const {register, handleSubmit} = useForm()

    const onSubmit = handleSubmit((data) =>{
        console.log(data);
    })

    return (
        <div className="form-container">
          
          <div>
            
          <h1 className="titulo">Iniciar sesión</h1>

          <form onSubmit={handleSubmit((values) => console.log(values))}>
            
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