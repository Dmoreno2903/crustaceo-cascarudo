import { useParams } from "react-router-dom"
import {BURGUER} from '../dataMomentanea/productos'
export const Detallado = () => {
  const {id} = useParams()
  return (
    <div>Detallado
      <br/>

      producto con id: {id}
    </div>
  )
}
