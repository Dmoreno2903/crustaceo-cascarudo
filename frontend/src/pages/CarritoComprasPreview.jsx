import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import "../styles/pages/CarritoComprasPreview.css";
import { BURGUER, FRIES, DRINK } from "../dataMomentanea/productos";
import { useNavigate } from "react-router-dom";

export const CarritoComprasPreview = () => {
  const { cartItems, updateCartItem, removeCartItem, setCartItems } = useContext(AuthContext);
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

  const handleCheckout = () => {
    // Vaciar el carrito
    setCartItems({ fries: {}, burguers: {}, drinks: {} });
    // Redirigir a la página de resumen de compra
    navigate("/carrito-compras-check");
  };

  // Calcular el total
  const calculateTotal = () => {
    const getTotalPrice = (cart, items) => {
      return Object.keys(cart).reduce((total, id) => {
        const item = items.find((i) => i.id === parseInt(id));
        return total + (item ? item.price * cart[id] : 0);
      }, 0);
    };

    const burguersTotal = getTotalPrice(burguersCart, BURGUER);
    const friesTotal = getTotalPrice(friesCart, FRIES);
    const drinksTotal = getTotalPrice(drinksCart, DRINK);

    return burguersTotal + friesTotal + drinksTotal;
  };

  const totalPrice = calculateTotal();

  // Formatear el total con puntos como separadores
  const formatTotal = (amount) => {
    return amount.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <>
      {Object.keys(cartItems.fries).length === 0 &&
      Object.keys(cartItems.burguers).length === 0 &&
      Object.keys(cartItems.drinks).length === 0 ? (
        <p>No se han agregado productos al carrito aún</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{ width: "15%" }}>
                Producto
              </th>
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
              <td style={{ textAlign: "center" }}>{formatTotal(totalPrice)}</td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </table>
      )}

      <div className="button-container">
        {Object.keys(cartItems.fries).length > 0 ||
        Object.keys(cartItems.burguers).length > 0 ||
        Object.keys(cartItems.drinks).length > 0 ? (
          <button className="btn btn-primary comprar-btn" onClick={handleCheckout}>
            COMPRAR
          </button>
        ) : null}
      </div>
    </>
  );
};
