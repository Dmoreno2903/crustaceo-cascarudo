import {useForm} from "react-hook-form"
import {Link, useNavigate} from "react-router-dom";
import '../styles/pages/Registro.css'
import { AuthContext } from "../context/AuthContextProvider";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal"; 
import axios from "axios";

Modal.setAppElement('#root');

export const Registro = () => {
  
  const {setUser, USERS, CLIENT, playAudio} = useContext(AuthContext)
  
    const {register, handleSubmit} = useForm()
    
    const navigate = useNavigate()

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const onSubmit = async (data) => {
      try {
          // Verificación de la palabra prohibida "plankton" en los campos clave
          if (
              data.firstName.toLowerCase().includes('plankton') ||
              data.lastName.toLowerCase().includes('plankton') ||
              data.email.toLowerCase().includes('plankton') ||
              data.username.toLowerCase().includes('plankton') || 
              data.password.toLowerCase().includes('plankton') ||
              data.confirmPassword.toLowerCase().includes('plankton')
          ) {
              // playAudio();  // Reproduce el sonido de advertencia
              navigate('/login-prohibido');  // Navega a la página de acceso prohibido
              toast.error('Registro denegado');  // Muestra un mensaje de error
              return;  // Detener la ejecución si se encuentra la palabra prohibida
          }
  
          // Realizar la petición POST a la API de Django para registrar el usuario
          const response = await fetch('http://127.0.0.1:8000/user/register/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username: data.username,
                  email: data.email,
                  first_name: data.firstName,
                  last_name: data.lastName,
                  password: data.password,
                  phone: data.phone,
                  address: data.address,
                  birthdate: data.birthdate
              })
          });
  
          const result = await response.json();
  
          if (!response.ok) {
              // Si la respuesta no es OK, mostrar error
              if (result.username) {
                  toast.error("El usuario ya existe");
              }
              if (result.email) {
                  toast.error("El email ya existe");
              }
          } else {
              // Si el registro es exitoso, almacenar el usuario en localStorage y navegar
              const newUser = {
                  ...result,  // Los datos devueltos por la API
                  profilePicture: 'https://via.placeholder.com/150',  // Placeholder de imagen por defecto
                  cartItems: {
                      "fries": { },
                      "burguers": { },
                      "drinks": { }
                  },
                  purchases: []
              };
  
              let { password, ...copyUser } = newUser;  // Eliminar el password del objeto para almacenar en el contexto
              setUser(copyUser);
              localStorage.setItem('username', JSON.stringify(copyUser));
              navigate('/usuario');
              toast.success(`Sesión iniciada, hola ${copyUser.first_name} ${copyUser.last_name}, por favor configura los datos faltantes`);
          }
  
      } catch (error) {
          // Manejo de errores de red u otros
          console.error("Error en el registro:", error);
          toast.error("Ocurrió un error al registrar el usuario");
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
              {/* Aquí agregamos un botón que abrirá el modal */}
              <label htmlFor="terms">
                Acepto las <span className="politica-link" onClick={() => setModalIsOpen(true)}>políticas de tratamiento de datos</span>
              </label>
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

            <div>
            <Modal 
              isOpen={modalIsOpen} 
              onRequestClose={() => setModalIsOpen(false)}
              contentLabel="Políticas de Tratamiento de Datos"
              className="modal"
              overlayClassName="modal-overlay"
            >

              <h2>Política de Tratamiento de Datos Personales.</h2>

              <h4>1. Consentimiento del Usuario.</h4>
              <p>El usuario acepta que sus datos serán utilizados para analizar sus preferencias 
                de compra con el fin de mejorar los productos y beneficios ofrecidos por "Crustáceo Cascarudo".
              </p>

              <h4>2. Uso y Protección de Datos.</h4>
              <p>
              Los datos serán utilizados exclusivamente por "Crustáceo Cascarudo" y no se transferirán a terceros. 
              Se implementan medidas de seguridad, incluyendo cifrado de datos, para prevenir la adulteración, pérdida, 
              consulta, uso o acceso no autorizado.
              </p>

              <h4>3. Cumplimiento Legal.</h4>
              <p>
              Esta política cumple con la Ley Estatutaria 1581 de 2012 y el Decreto Reglamentario 1377 de 2013 
              sobre protección de datos personales en Colombia.
              </p>

              <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
            </Modal>
            </div>
        </div>
      );
}

