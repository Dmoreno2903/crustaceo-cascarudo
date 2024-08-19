import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import "../styles/pages/CarritoComprasPreview.css";
import { BURGUER, FRIES, DRINK } from "../dataMomentanea/productos";

// Función para formatear números con puntos como separadores de miles
const formatNumber = (number) => {
  const parts = number.toFixed(2).split(".");
  // Formatear la parte entera con puntos como separadores de miles
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(",");
};

export const CarritoComprasPreview = () => {
  const { cartItems, burguers, fries, drinks, updateCartItem, removeCartItem } = useContext(AuthContext);

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

  // Función para calcular el total
  const calculateTotal = () => {
    let total = 0;
    const findItemById = (id, category) => {
      switch (category) {
        case "burguers":
          return burguers.find(item => item.id === id);
        case "fries":
          return fries.find(item => item.id === id);
        case "drinks":
          return drinks.find(item => item.id === id);
        default:
          return null;
      }
    };

    Object.keys(cartItems).forEach(category => {
      Object.keys(cartItems[category]).forEach(id => {
        const item = findItemById(parseInt(id), category);
        if (item) {
          total += item.price * cartItems[category][id];
        }
      });
    });

    return formatNumber(total); // Formatear el total
  };

  const totalAmount = calculateTotal();

  return (
    <>
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
            const friesItem = FRIES.find((f) => f.id === parseInt(key));
            return (
              <tr key={`fries-${key}`}>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <img
                    src={friesItem.image}
                    alt={friesItem.name}
                    style={{ width: "80px", height: "80px" }}
                  />
                </td>
                <td>
                  <b>{friesItem.name} - </b> {friesItem.description}
                </td>
                <td>{friesItem.price}</td>
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
            <td style={{ textAlign: "center" }}>${totalAmount}</td>
            <td colSpan="2"></td>
          </tr>
        </tfoot>
      </table>

      <div className="button-container">
        <button className="btn btn-primary comprar-btn">COMPRAR</button>
      </div>
    </>
  );
};
