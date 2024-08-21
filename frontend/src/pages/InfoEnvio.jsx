import { useContext, useState } from "react";
import "../styles/pages/InfoEnvio.css";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export const InfoEnvio = () => {
  
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  

  const handleEnvioSubmit = (e) => {
    e.preventDefault();
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
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>

          <div className="shipment-section">
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="Ingrese su dirección"
              required
            />
          </div>

          <div className="shipment-section">
            <input
              type="number"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Ingrese su número de teléfono"
              required
            />
          </div>

          <div className="btn2-container">
            <button className="back-btn"
            onClick={handleBack}>Volver</button>
            <button
              className="btn continue-btn"
              onClick={handleClick}
              disabled={!email || !address || !phone} 
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
