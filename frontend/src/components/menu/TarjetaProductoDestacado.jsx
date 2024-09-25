import { BotonAgregarProducto } from "../botones/BotonAgregarProducto";
import "../../styles/menu/TarjetaProductoDestacado.css";
import { useNavigate } from "react-router-dom";

export const TarjetaProductoDestacado = ({ producto }) => {
  const navigate = useNavigate();

  const handleInfoClick = (id) => {
    navigate(`/detallado/burguers/${id}`);
  };

  return (
    <div className="tarjeta-producto-destacado">
      <div
        className="destacado-info-producto"
        onClick={() => handleInfoClick(producto.id)}
      >
        <img className="detacado-image" src={`http://localhost:8000${producto.image}`} />
        <h2 className="detacado-name">{producto.name}</h2>
        <p className="detacado-description">{producto.description}</p>
        <p className="detacado-price">
          $
          {producto.price.toLocaleString("es-CO", {
            minimumFractionDigits: 0,
          })}
        </p>
      </div>
      <BotonAgregarProducto productId={producto.id} selectedList={"burguers"} />
    </div>
  );
};
