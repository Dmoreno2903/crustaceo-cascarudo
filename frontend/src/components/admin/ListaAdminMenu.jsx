
export const ListaAdminMenu = ({burguer}) => {
    
  return (
    <tr>
        <td>{burguer.id}</td>
        <td>{burguer.name}</td>
        <td>{burguer.description}</td>
        <td>{burguer.score}</td>
        <td>{burguer.price}</td>
        <td><img src={burguer.image}></img></td>
        <td>{Number(burguer.count)}</td>
        <td>{String(burguer.is_outstanding)}</td>
    </tr>
    
  )
}
