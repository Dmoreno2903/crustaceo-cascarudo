import "../styles/pages/ConfirmacionCompra.css"; // Asegúrate de tener este archivo para los estilos
import bobImage from '../assets/imagenes/bobImage.jpg'; // Ajusta la ruta según la ubicación de tu imagen

export const ConfirmacionCompra = () => {
  return (
    <div className="carrito-check">
      <div className="image">
        <img src={bobImage} alt="Gracias por su compra" />
      </div>
    </div>
  );
};
