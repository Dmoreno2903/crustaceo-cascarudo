import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import '../styles/pages/RecuperarContrasena.css';
import toast from 'react-hot-toast';

import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";


export const RecuperarContrasena = () => {

  const {setUser, USERS} = useContext(AuthContext)

  const navigate = useNavigate()

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    
    const user = USERS.find(client => client.email === data.email);
  
    if (user) {

      // Simular la generación de un token único
      const resetToken = Math.random().toString(36).substr(2);

      // Guardar el token y el email en el localStorage
      localStorage.setItem("resetToken", resetToken);
      localStorage.setItem("resetEmail", data.email);

        

      toast.success(`Se ha enviado un enlace de recuperación a ${data.email}`);

      navigate('/restablecer-contrasena')
      
    } else {
      toast.error("No se encontró una cuenta con ese correo electrónico");
    }
  
    reset(); // Resetea el formulario
  };

  return (
    <div className="form-container">
      <h1 className="titulo">Recuperar Contraseña</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Correo electrónico"
          />
        </div>
        <button type="submit" className="submit-button">
          Enviar enlace de recuperación
        </button>
      </form>
      <div className="back-to-login">
        <Link to="/inicio-de-sesion" className="link">Volver al inicio de sesión</Link>
      </div>
    </div>
  );
}