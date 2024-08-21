import { useContext, useState } from "react";
import "../styles/pages/InfoEnvio.css";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export const InfoPago = () => {
  const { setCartItems } = useContext(AuthContext);
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const navigate = useNavigate();

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleIdNumberChange = (e) => {
    setIdNumber(e.target.value);
  };

  const handleAccountHolderChange = (e) => {
    setAccountHolder(e.target.value);
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
      accountHolder,
      idNumber,
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
            <select
              id="accountType"
              value={accountType}
              onChange={handleAccountTypeChange}
              required
            >
              <option value="" disabled>Seleccione el tipo de cuenta</option>
              <option value="ahorro">Cuenta de ahorro</option>
              <option value="corriente">Cuenta corriente</option>
            </select>
          </div>

          <div className="shipment-section">
            <input
              type="text"
              id="accountNumber"
              value={accountNumber}
              onChange={handleAccountNumberChange}
              placeholder="Ingrese el número de cuenta"
              required
            />
          </div>

          <div className="shipment-section">
            <input
              type="text"
              id="idNumber"
              value={idNumber}
              onChange={handleIdNumberChange}
              placeholder="Ingrese su número de identificación"
              required
            />
          </div>

          <div className="shipment-section">
            <input
              type="text"
              id="accountHolder"
              value={accountHolder}
              onChange={handleAccountHolderChange}
              placeholder="Ingrese el titular de la cuenta"
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
              disabled={!accountType || !accountNumber || !idNumber || !accountHolder}
            >
              Pagar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
