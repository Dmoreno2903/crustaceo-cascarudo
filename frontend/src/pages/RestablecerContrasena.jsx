import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

import '../styles/pages/RestablecerContrasena.css';

import { AuthContext } from "../context/AuthContextProvider";
import { useContext } from "react";

export const RestablecerContrasena = () => {


  const {setUser, USERS} = useContext(AuthContext)
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const storedToken = localStorage.getItem("resetToken");
    const storedEmail = localStorage.getItem("resetEmail");

    if (storedToken && storedEmail) {
      // Simulamos la verificación del token
      const newPassword = data.password;

      const userIndex = USERS.findIndex(user => user.email === storedEmail);
      
      if (userIndex !== -1) {
        // Actualizar la contraseña del usuario
        USERS[userIndex].password = newPassword;  
      }   
      
      toast.success("Tu contraseña ha sido actualizada");
      reset(); // Resetea el formulario
      localStorage.removeItem("resetToken");
      localStorage.removeItem("resetEmail");

      navigate('/inicio-de-sesion'); // Redirige a la página de inicio de sesión
    } else {
      toast.error("El enlace de recuperación no es válido o ha expirado");
    }
  };

  return (
    <div className="form-container">
      <h1 className="titulo">Restablecer Contraseña</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Nueva contraseña"
          />
        </div>
        <button type="submit" className="submit-button">
          Restablecer Contraseña
        </button>
      </form>
    </div>
  );
};