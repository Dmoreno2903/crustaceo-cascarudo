import {useForm} from "react-hook-form"
import {Link} from "react-router-dom";
import '../styles/pages/Registro.css'

export const Registro = () => {

    const {register, handleSubmit} = useForm()

    return (
        <div className="inicio-form-container">
          
          <div>
            
          <h1 className="inicio-titulo">Regístrate</h1>

          <form onSubmit={handleSubmit((values) => console.log(values))}>
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


