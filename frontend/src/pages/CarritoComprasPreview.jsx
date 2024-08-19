import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import "../styles/pages/CarritoComprasPreview.css";
import { BURGUER, FRIES, DRINK } from "../dataMomentanea/productos";
import { useNavigate } from "react-router-dom";

export const CarritoComprasPreview = () => {
  const { cartItems, updateCartItem, removeCartItem } = useContext(AuthContext);
  const [address, setAddress] = useState(""); // Estado para la dirección
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  let burguersCart = cartItems["burguers"];
  let friesCart = cartItems["fries"];
  let drinksCart = cartItems["drinks"];

  const handleIncrement = (productId, category) => {
    updateCartItem(productId, category, (cartItems[category][productId] || 0) + 1);
  };

  const handleDecrement = (productId, category) => {
    const currentQuantity = cartItems[category][productId] || 1;
    if (currentQuantity > 1) {
      updateCartItem(productId, category, currentQuantity - 1);
    }
  };

  const handleRemove = (productId, category) => {
    removeCartItem(productId, category);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleBuy = () => {
    // Borra el carrito
    // redirige a CarritoComprasCheck
    navigate('/carrito-compras-check');
  };

  // Calcula el total
  const calculateTotal = () => {
    let total = 0;
    Object.entries(cartItems).forEach(([category, items]) => {
      Object.entries(items).forEach(([id, quantity]) => {
        const product = [...BURGUER, ...FRIES, ...DRINK].find(p => p.id === parseInt(id));
        if (product) {
          total += product.price * quantity;
        }
      });
    });
    return total;
  };

  const total = calculateTotal();

  return (
    <>
      {Object.keys(cartItems["burguers"]).length === 0 && 
      Object.keys(cartItems["fries"]).length === 0 &&
      Object.keys(cartItems["drinks"]).length === 0 ? (
        <p>No se han agregado productos al carrito aún</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col" style={{ width: "15%" }}>Producto</th>
                <th scope="col">Detalle de compra</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {/* Hamburguesas */}
              {Object.keys(burguersCart).map((key) => {
                const burguer = BURGUER.find((b) => b.id === parseInt(key));
                return (
                  <tr key={`burguer-${key}`}>
                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                      <img
                        src={burguer.image}
                        alt={burguer.name}
                        style={{ width: "80px", height: "80px" }}
                      />
                    </td>
                    <td>
                      <b>{burguer.name} - </b> {burguer.description}
                    </td>
                    <td>{burguer.price}</td>
                    <td>
                      <div className="quantity-controls">
                        <button
                          className="btn btn-outline-primary quantity-btn"
                          onClick={() => handleDecrement(key, "burguers")}
                        >
                          -
                        </button>
                        <span className="quantity-value">{burguersCart[key]}</span>
                        <button
                          className="btn btn-outline-primary quantity-btn"
                          onClick={() => handleIncrement(key, "burguers")}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button onClick={() => handleRemove(key, "burguers")}>Eliminar</button>
                    </td>
                  </tr>
                );
              })}

              {/* Papas */}
              {Object.keys(friesCart).map((key) => {
                const fries = FRIES.find((f) => f.id === parseInt(key));
                return (
                  <tr key={`fries-${key}`}>
                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                      <img
                        src={fries.image}
                        alt={fries.name}
                        style={{ width: "80px", height: "80px" }}
                      />
                    </td>
                    <td>
                      <b>{fries.name} - </b> {fries.description}
                    </td>
                    <td>{fries.price}</td>
                    <td>
                      <div className="quantity-controls">
                        <button
                          className="btn btn-outline-primary quantity-btn"
                          onClick={() => handleDecrement(key, "fries")}
                        >
                          -
                        </button>
                        <span className="quantity-value">{friesCart[key]}</span>
                        <button
                          className="btn btn-outline-primary quantity-btn"
                          onClick={() => handleIncrement(key, "fries")}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button onClick={() => handleRemove(key, "fries")}>Eliminar</button>
                    </td>
                  </tr>
                );
              })}

              {/* Bebidas */}
              {Object.keys(drinksCart).map((key) => {
                const drink = DRINK.find((d) => d.id === parseInt(key));
                return (
                  <tr key={`drink-${key}`}>
                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                      <img
                        src={drink.image}
                        alt={drink.name}
                        style={{ width: "80px", height: "80px" }}
                      />
                    </td>
                    <td>
                      <b>{drink.name} - </b>
                      {drink.description}
                    </td>
                    <td>{drink.price}</td>
                    <td>
                      <div className="quantity-controls">
                        <button
                          className="btn btn-outline-primary quantity-btn"
                          onClick={() => handleDecrement(key, "drinks")}
                        >
                          -
                        </button>
                        <span className="quantity-value">{drinksCart[key]}</span>
                        <button
                          className="btn btn-outline-primary quantity-btn"
                          onClick={() => handleIncrement(key, "drinks")}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button onClick={() => handleRemove(key, "drinks")}>Eliminar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" style={{ textAlign: "right" }}>
                  <b>Total:</b>
                </td>
                <td style={{ textAlign: "center" }}>
                  {total.toLocaleString("es-CO", { minimumFractionDigits: 2 })}
                </td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>

          {/* Campo de dirección de envío */}
          <div className="address-section">
            <h4>Información de envio</h4>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="Ingrese su dirección"
              required
            />
          </div>

          <div className="address-section">
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Ingrese su número de teléfono"
              required
            />
          </div>

          <div className="button-container">
            <button
              className="btn comprar-btn"
              onClick={handleBuy}
              disabled={!address || !phone} // Deshabilitar si los campos están vacíos
            >
              COMPRAR
            </button>
          </div>
        </>
      )}
    </>
  );
};
