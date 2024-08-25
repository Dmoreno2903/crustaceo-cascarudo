import { Navbar } from "./components/Navbar"
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { Menu } from "./pages/Menu"
import { CarritoComprasPreview} from "./pages/CarritoComprasPreview"
import { Inicio } from "./pages/Inicio"
import { Registro } from "./pages/Registro"
import { InicioDeSesion } from "./pages/InicioDeSesion"
import { RecuperarContrasena } from "./pages/RecuperarContrasena"
import { RestablecerContrasena } from "./pages/RestablecerContrasena";
import { Detallado } from "./pages/Detallado"
import { Usuario } from "./pages/Usuario"
import { Footer } from "./components/Footer"
import { PrivateRoute } from "./utils/PrivateRoute"
import "./styles/App.css"
import { AuthContextProvider } from "./context/AuthContextProvider"
import { NotFound } from "./pages/NotFound"
import {Toaster} from "react-hot-toast"
import { Admin } from "./pages/Admin"
import { Facturas } from "./pages/Facturas"
import { AdminContextProvider } from "./context/AdminContextProvider"
import { PrivateAdminRoute } from "./utils/PrivateAdminRoute"
import { InfoEnvio } from "./pages/InfoEnvio"
import { InfoPago } from "./pages/InfoPago"
import { ConfirmacionCompra } from "./pages/ConfirmacionCompra"
import LoginProhibido from "./pages/LoginProhibido"

function App() {

  return (
   <>
  <Router>
    
    <AuthContextProvider>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Navigate to="/menu" replace />} />
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/inicio" element={<Inicio/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/inicio-de-sesion" element={<InicioDeSesion/>}/>
          <Route path="/recuperar-contrasena" element={<RecuperarContrasena/>} />
          <Route path="/restablecer-contrasena" element={<RestablecerContrasena />} />
          <Route path="/carrito-compras-preview" element={<CarritoComprasPreview/>}/> {/* TODO: Volver a poner esta ruta privada */}
          <Route path="/info-envio" element={<InfoEnvio/>}/> {/* TODO: Volver a poner esta ruta privada */}
          <Route path="/info-pago" element={<InfoPago/>}/> {/* TODO: Volver a poner esta ruta privada */}
          <Route path="/confirmacion-compra" element={<PrivateRoute><ConfirmacionCompra/></PrivateRoute>}/>
          <Route path="/detallado/:product/:id" element={<Detallado/>}/>
          <Route path="/usuario" element={<PrivateRoute><Usuario/></PrivateRoute>}/>
          <Route path="/admin" element={<PrivateAdminRoute><AdminContextProvider><Admin /></AdminContextProvider></PrivateAdminRoute>} />
          <Route path="/admin/facturas" element={<PrivateAdminRoute><AdminContextProvider><Facturas /></AdminContextProvider></PrivateAdminRoute>} />
          <Route path="/login-prohibido" element={<LoginProhibido/>}/>
          
          <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
      <Toaster/>
    </AuthContextProvider>
  </Router>  
   </>
  )
}

export default App
