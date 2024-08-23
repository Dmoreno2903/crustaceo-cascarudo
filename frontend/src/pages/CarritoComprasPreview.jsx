import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import "../styles/pages/CarritoComprasPreview.css";
import { BURGUER, FRIES, DRINK } from "../dataMomentanea/productos";
import { useNavigate } from "react-router-dom";

export const CarritoComprasPreview = () => {
  const { cartItems, updateCartItem, removeCartItem } = useContext(AuthContext);
  const navigate = useNavigate();

  let burguersCart = cartItems["burguers"];
  let friesCart = cartItems["fries"];
  let drinksCart = cartItems["drinks"];

  const handleIncrement = (productId, category) => {
    updateCartItem(
      productId,
      category,
      (cartItems[category][productId] || 0) + 1
    );
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

  const handleContinue = () => {
    navigate("/info-envio");
  };

  const handleBack = () => {
    navigate("/menu");
  };

  const calculateCategoryTotal = (items, productList) => {
    return Object.entries(items).reduce((total, [id, quantity]) => {
      const product = productList.find((p) => p.id === parseInt(id));
      if (product) {
        return total + product.price * quantity;
      }
      return total;
    }, 0);
  };

  const calculateTotal = () => {
    const totalFries = calculateCategoryTotal(cartItems.fries, FRIES);
    const totalBurguers = calculateCategoryTotal(cartItems.burguers, BURGUER);
    const totalDrinks = calculateCategoryTotal(cartItems.drinks, DRINK);

    const total = totalFries + totalBurguers + totalDrinks;

    return {
      total,
    };
  };

  const { total } = calculateTotal();

  return (
    <>
      {Object.keys(cartItems["burguers"]).length === 0 &&
      Object.keys(cartItems["fries"]).length === 0 &&
      Object.keys(cartItems["drinks"]).length === 0 ? (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
          <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: "100px", height: "100px", backgroundColor: "#3e3a3a" }}
          >
            <i
              className="bi bi-cart"
              style={{ fontSize: "40px", color: "white" }}
            ></i>
          </div>
          <h3 className="mt-3">Aún no has agregado productos a tu carrito</h3>
        </div>
      ) : (
        <>
          <div className="table-container">
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
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <img
                          src={burguer.image}
                          alt={burguer.name}
                          style={{ width: "80px", height: "80px" }}
                        />
                      </td>
                      <td>
                        <b>{burguer.name} - </b> {burguer.description}
                      </td>
                      <td>${burguer.price.toLocaleString("es-CO"
                    )}</td>
                      <td style={{ textAlign: "center" }}>
                        <div className="quantity-controls">
                          <button
                            className="btn btn-outline-primary quantity-btn"
                            onClick={() => handleDecrement(key, "burguers")}
                          >
                            -
                          </button>
                          <span className="quantity-value">
                            {burguersCart[key]}
                          </span>
                          <button
                            className="btn btn-outline-primary quantity-btn"
                            onClick={() => handleIncrement(key, "burguers")}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleRemove(key, "burguers")}
                        >
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {/* Papas */}
                {Object.keys(friesCart).map((key) => {
                  const fries = FRIES.find((f) => f.id === parseInt(key));
                  return (
                    <tr key={`fries-${key}`}>
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <img
                          src={fries.image}
                          alt={fries.name}
                          style={{ width: "80px", height: "80px" }}
                        />
                      </td>
                      <td>
                        <b>{fries.name} - </b> {fries.description}
                      </td>
                      <td>${fries.price.toLocaleString("es-CO"
                    )}</td>
                      <td>
                        <div className="quantity-controls">
                          <button
                            className="btn btn-outline-primary quantity-btn"
                            onClick={() => handleDecrement(key, "fries")}
                          >
                            -
                          </button>
                          <span className="quantity-value">
                            {friesCart[key]}
                          </span>
                          <button
                            className="btn btn-outline-primary quantity-btn"
                            onClick={() => handleIncrement(key, "fries")}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleRemove(key, "fries")}
                        >
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {/* Bebidas */}
                {Object.keys(drinksCart).map((key) => {
                  const drink = DRINK.find((d) => d.id === parseInt(key));
                  return (
                    <tr key={`drink-${key}`}>
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
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
                      <td>${drink.price.toLocaleString("es-CO"
                    )}</td>
                      <td>
                        <div className="quantity-controls">
                          <button
                            className="btn btn-outline-primary quantity-btn"
                            onClick={() => handleDecrement(key, "drinks")}
                          >
                            -
                          </button>
                          <span className="quantity-value">
                            {drinksCart[key]}
                          </span>
                          <button
                            className="btn btn-outline-primary quantity-btn"
                            onClick={() => handleIncrement(key, "drinks")}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleRemove(key, "drinks")}
                        >
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" style={{ textAlign: "right" }}>
                    <b>Total: </b>
                  </td>
                  <td style={{ textAlign: "center" }}>$
                    {total.toLocaleString("es-CO"
                    )}

                  </td>
                  <td colSpan="2"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="btn-container">
            <button className="back-btn" onClick={handleBack}>
              Volver
            </button>
            <button className="btn continue-btn" onClick={handleContinue}>
              Continuar
            </button>
          </div>
        </>
      )}
    </>
  );
};
