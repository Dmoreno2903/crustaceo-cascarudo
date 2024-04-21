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
