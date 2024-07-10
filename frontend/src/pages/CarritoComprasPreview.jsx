import { useContext } from "react"
import { CarritoContext } from "../context/CarritoContext"
import "../styles/pages/CarritoComprasPreview.css";

export const CarritoComprasPreview = () => {
    
  return (
    <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
               
            </table>
            <div className="d-flex justify-content-center">
                <button 
                className="btn btn-primary w-25"
                >Comprar</button>
            </div>
            
        </>
  )
}

