import { useContext, useState } from "react";
import "../styles/pages/InfoEnvio.css";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import solds from "../services/solds";
import userService from "../services/user";


export const InfoPago = () => {

  const { user, token, cartItems, setCartItems, setSalesUser } = useContext(AuthContext);
  const [accountType, setAccountType] = useState(user.accountType || ""); // Valor por defecto del user
  const [accountNumber, setAccountNumber] = useState(user.accountNumber || ""); // Valor por defecto del user
  const navigate = useNavigate();

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleCancel = () => {
    navigate("/menu");
  };
  
  
  const handleBuy = async () => {

      // Realiza la compra utilizando los productos del carrito
      const response = await solds.addSale(token, cartItems);
      console.log('Response:', response);
      // Borra el carrito y redirige a la página de resumen de compra
      const responseGetCart = await userService.getCart(token)
      setCartItems(responseGetCart);
      // Actualiza las ventas después de la compra
      const update = await solds.getSolds(token);
      setSalesUser(update);

      navigate("/confirmacion-compra");
  };

  return (
    <>
      {/* Campo de información de pago */}
      <div className="page-container">
        <div className="form-container">
          <h3 className="title">Información de Pago</h3>

          <div className="shipment-section">
            <label htmlFor="accountType">Seleccione el tipo de cuenta </label>
            <select
              id="accountType"
              value={accountType} // Usar el valor del estado
              onChange={handleAccountTypeChange}
              required
            >
              <option value="ahorro">Cuenta de ahorro</option>
              <option value="corriente">Cuenta corriente</option>
              <option value="corriente">Efectivo</option>

            </select>
          </div>

          <div className="shipment-section">
            <label htmlFor="accountNumber">Número de cuenta</label>
            <input
              type="number"
              id="accountNumber"
              value={accountNumber} // Usar el valor del estado
              onChange={handleAccountNumberChange}
              placeholder="Ingrese el número de cuenta"
              required
            />
          </div>

          <div className="btn2-container">
            <button
              className="back-btn"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              className="btn continue-btn"
              type="button"
              onClick={handleBuy}
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
