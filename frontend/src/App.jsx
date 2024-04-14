import { Navbar } from "./components/Navbar"
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { Menu } from "./pages/menu/Menu"
import { CarritoComprasPreview} from "./pages/carritoComprasPreview/CarritoComprasPreview"
import { Inicio } from "./pages/inicio/Inicio"
import { Registro } from "./pages/registro/Registro"
import { InicioDeSesion } from "./pages/inicioDeSesion/InicioDeSesion"
import { CarritoComprasCheck } from "./pages/carritoComprasCheck/CarritoComprasCheck"
import { Detallado } from "./pages/detallado/Detallado"
import { Usuario } from "./pages/usuario/Usuario"

function App() {

  return (
   <>
   <Router>
      <Navbar/>
      
      <Routes>
          <Route path="/" element={<Navigate to="/menu" replace />} />
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/inicio" element={<Inicio/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/inicio-de-sesion" element={<InicioDeSesion/>}/>
          <Route path="/carrito-compras-preview" element={<CarritoComprasPreview/>}/>
          <Route path="/carrito-compras-check" element={<CarritoComprasCheck/>}/>
          <Route path="/detallado" element={<Detallado/>}/>

          
          <Route path="/usuario" element={<Usuario/>}/>
      </Routes>
   </Router>
   
   </>
  )
}

export default App
