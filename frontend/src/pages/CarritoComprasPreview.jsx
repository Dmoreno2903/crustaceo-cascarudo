import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import "../styles/pages/CarritoComprasPreview.css";
import { BURGUER, FRIES, DRINK } from "../dataMomentanea/productos";

export const CarritoComprasPreview = () => {
  const { cartItems, updateCartItem, removeCartItem } = useContext(AuthContext);

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

  // Verifica si el carrito está vacío
  const isEmpty = Object.values(cartItems).every(category => Object.keys(category).length === 0);

  // Calcula el total de la compra
  const calculateTotal = () => {
    const allProducts = [...BURGUER, ...FRIES, ...DRINK];
    let total = 0;

    Object.keys(cartItems).forEach(category => {
      Object.keys(cartItems[category]).forEach(productId => {
        const quantity = cartItems[category][productId];
        const product = allProducts.find(p => p.id === parseInt(productId));

        if (product) {
          total += product.price * quantity;
        }
      });
    });

    return total;
  };

  // Formatea el total
  const formatTotal = (total) => {
    return total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const totalAmount = formatTotal(calculateTotal());

  return (
    <>
      {isEmpty ? (
        <p>No se han agregado productos al carrito aún</p>
      ) : (
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
                <td style={{ textAlign: "center" }}>{totalAmount}</td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>

          {!isEmpty && (
            <div className="button-container">
              <button className="btn btn-primary comprar-btn">COMPRAR</button>
            </div>
          )}
        </>
      )}
    </>
  );
};
