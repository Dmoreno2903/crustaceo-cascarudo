import { useContext, useState } from "react";
import "../styles/pages/InfoEnvio.css";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export const InfoPago = () => {

  const { user } = useContext(AuthContext); 
  const { setCartItems } = useContext(AuthContext);
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
    setCartItems({
        fries: {},
        burguers: {},
        drinks: {},
    });
    navigate("/menu");
  };

  const handleBuy = () => {
    // Manejo de información de pago
    console.log("Información de pago:", {
      accountType,
      accountNumber,
    });

    // Borra el carrito y redirige a la página de resumen de compra
    setCartItems({
      fries: {},
      burguers: {},
      drinks: {},
    });
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
