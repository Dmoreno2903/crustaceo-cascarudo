import { useContext, useState } from "react";
import "../styles/pages/InfoEnvio.css";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export const InfoEnvio = () => {

  const { user } = useContext(AuthContext); 
  
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  

  const handleEnvioSubmit = () => {
    // Srive para manejar la información del envio
    console.log("Información de envío:", { email, address, phone });
  };
 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleContinue = () => {
    navigate("/info-pago")
  }

  const handleBack = () => {
    navigate("/carrito-compras-preview")
  }

  const handleClick = () => {
    handleContinue();
    handleEnvioSubmit();
  };

  return (
    <>
      {/* Campo de información de envío */}
      <div className="page-container">
        <div className="form-container">
          <h3 className="title">Información de envio</h3>
          <div className="shipment-section">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={handleEmailChange}
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>

          <div className="shipment-section">
            <label>Dirección</label>
            <input
              type="text"
              id="address"
              value={user.address}
              onChange={handleAddressChange}
              placeholder="Ingrese su dirección"
              required
            />
          </div>

          <div className="shipment-section">
            <label>Número de teléfono</label>
            <input
              type="text"
              id="phone"
              value={user.phone}
              onChange={handlePhoneChange}
              placeholder="Ingrese su número de teléfono"
              required
            />
          </div>

          <div className="btn2-container">
            <button className="back-btn"
            onClick={handleBack}>Volver al carrito</button>
            <button
              className="btn continue-btn"
              onClick={handleClick} 
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
