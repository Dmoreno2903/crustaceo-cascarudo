import {useForm} from "react-hook-form"
import {Link, useNavigate} from "react-router-dom";
import '../styles/pages/Registro.css'
import { AuthContext } from "../context/AuthContextProvider";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal"; 

Modal.setAppElement('#root');

export const Registro = () => {
  
  const {setUser, USERS, CLIENT} = useContext(AuthContext)
  
    const {register, handleSubmit} = useForm()
    
    const navigate = useNavigate()

    const [modalIsOpen, setModalIsOpen] = useState(false);

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
        newUser.name = `${data.firstName} ${data.lastName}`
        newUser.username = data.username
        newUser.password = data.password
        newUser.email = data.email
        
        
        let { password, ...copyUser } = newUser
        setUser(copyUser)
        navigate('/usuario')
        localStorage.setItem('username', JSON.stringify(copyUser))
        console.log(copyUser.name)
        toast.success(`Sesion iniciada, hola ${copyUser.name} porfavor configura los datos faltantes`)
        
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


