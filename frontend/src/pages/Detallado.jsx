import { useParams } from "react-router-dom"

export const Detallado = () => {
  const {id} = useParams()
  return (
    <div>Detallado
      <br/>

      producto con id: {id}
    </div>
  )
}
