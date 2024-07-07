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
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                {...register("username", { required: true })}
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
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
          <div>
            <h2>¿No tienes cuenta?</h2>
            <Link className="link" to="/registro">
            Regístrate
            </Link>
            </div>
        </div>
      );
}