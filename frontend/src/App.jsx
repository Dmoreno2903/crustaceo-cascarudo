import { Navbar } from "./components/Navbar"
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { Menu } from "./pages/Menu"
import { CarritoComprasPreview} from "./pages/CarritoComprasPreview"
import { Inicio } from "./pages/Inicio"
import { Registro } from "./pages/Registro"
import { InicioDeSesion } from "./pages/InicioDeSesion"
import { CarritoComprasCheck } from "./pages/CarritoComprasCheck"
import { Detallado } from "./pages/Detallado"
import { Usuario } from "./pages/Usuario"
import { Footer } from "./components/Footer"
import { PrivateRoute } from "./utils/PrivateRoute"
import "./styles/App.css"
import { AuthContextProvider } from "./context/AuthContextProvider"
import { NotFound } from "./pages/NotFound"


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
          <Route path="/carrito-compras-preview" element={<PrivateRoute><CarritoComprasPreview/></PrivateRoute>}/>
          <Route path="/carrito-compras-check" element={<PrivateRoute><CarritoComprasCheck/></PrivateRoute>}/>
          <Route path="/detallado" element={<Detallado/>}/>
          <Route path="/usuario" element={<PrivateRoute><Usuario/></PrivateRoute>}/>

          <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
      </AuthContextProvider>
   </Router>

   
   
   </>
  )
}

export default App
