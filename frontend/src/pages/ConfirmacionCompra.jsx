
import "../styles/pages/ConfirmacionCompra.css"; 
import bobImage from '../assets/imagenes/bobSponja.gif'; 

export const ConfirmacionCompra = () => {
  return (
    <div className="carrito-check">
      <div className="image">
        <img src={bobImage} alt="Gracias por su compra" />
      </div>
      <div className="message">
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu pedido será entregado lo más pronto posible por <b>Bob Esponja</b>.</p>
      </div>
    </div>
  );
};
