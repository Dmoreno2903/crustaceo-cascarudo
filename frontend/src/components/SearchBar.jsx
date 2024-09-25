import { useContext, useState } from "react";
import "../styles/SearchBar.css";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {

  const { burguers, fries, drinks } = useContext(AuthContext)

  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] =useState('')
  const [filteredItems, setFilteredItems] = useState([])

  // Verificar si burguers, fries y drinks están disponibles
  if (!burguers || !fries || !drinks) {
    return null; // No renderizar nada si cualquiera de estos no está disponible
  }

  const items = [
      ...burguers,
      ...fries,
      ...drinks
  ]

  
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setFilteredItems([]) // Si no hay término de búsqueda, no muestra nada
    } else {
      const filtered = items.filter(item => 
        item.name.toLowerCase().includes(term)
      ).slice(0, 5)

      setFilteredItems(filtered)
    }
  }

  const handleInfoClick = (table, id) => {
    navigate(`/detallado/${table}/${id}`)
    setSearchTerm('')
    setFilteredItems([])
  }

  return (
    <div className="search-container">
        <input
          type='text'
          placeholder='Buscar productos...'
          className='barra-busqueda'
          value={searchTerm}
          //El evento onChange es un manejador de eventos que se activa cada vez que el valor de un elemento de entrada (como un input, textarea, o select) cambia.
          onChange={handleSearch}
        />
        {filteredItems.length > 0 && (
                <ul className="search-results">
                    {filteredItems.map((item, index) => (
                        <li key={index} onClick={()=>handleInfoClick(item.table, item.id)}>{item.name}</li>
                    ))}
                </ul>
        )}
    </div>
  )
}

export default SearchBar