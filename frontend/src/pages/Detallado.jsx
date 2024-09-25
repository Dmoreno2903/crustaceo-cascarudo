import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BotonAgregarProducto } from "../components/botones/BotonAgregarProducto";
import "../styles/pages/Detallado.css";
import products from "../services/products";

export const Detallado = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState();
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();

  
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await products.getProduct(id);
        console.log("Producto:", data); // Imprimir el producto en la consola
        setProducto(data);
        setLoading(false); // Actualizar el estado de carga
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/error"); // Redirigir a una página de error si ocurre un error
      }
    };

    fetchProduct();
  }, [id, navigate]);


  if (loading) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtiene el producto
  }
  
  return (
    <div>
      {producto && (
        <div className="tarjeta-producto-detallado">
          <img className="detallado-image" src={`http://localhost:8000${producto.image}`} />
          <div className="detallado-info-producto">
            <h2 className="detallado-name">{producto.name}</h2>
            <p className="detallado-description">{producto.description}</p>
            {producto.score && <p>Puntuación: {producto.score}</p>}
            <p className="detallado-price">${producto.price.toLocaleString("es-CO"
                    )}</p>
            <BotonAgregarProducto productId={producto.id}/>
            <button className="return-btn" onClick={() => navigate(-1)}>Volver al menú</button>
          </div>
        </div>
      )}
    </div>
  );
};
