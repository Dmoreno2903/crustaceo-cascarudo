import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import "../styles/pages/CarritoComprasPreview.css";
import { useNavigate } from "react-router-dom";
import productService from "../services/products";
import userService from "../services/user"

export const CarritoComprasPreview = () => {
  const { user, token, cartItems, updateCartItem, removeCartItem, setCartItems } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProducts = async () => {
      const productDetails = [];
      for (const key of Object.keys(cartItems.products)) {
        try {
          const product = await productService.getProduct(key);
          productDetails.push({
            ...product,
            quantity: cartItems.products[key],
            priceTotalProduct: cartItems.products[key]*product.price,
          });
        } catch (error) {
          console.error(`Error fetching product with id ${key}:`, error);
        }
      }
      setProducts(productDetails);
    };

    fetchProducts();
  }, [cartItems]);

  

  const handleIncrement = async (productId) => {
        // Prepara los productos para enviar en el formato correcto
        const products = {
            products: {
                ...cartItems.products,
                [productId]: (cartItems.products[productId] || 0) + 1
            }
        };

        // Llama a userService.addCartItems para agregar el producto al carrito
        const updatedCartItems = await userService.addCartItems(token, products);

        // Actualiza el estado del carrito con los nuevos items
        setCartItems(updatedCartItems);

      };

  const handleDecrement = async (productId) => {
    const currentQuantity = cartItems.products[productId] || 0;
            if (currentQuantity > 1) {
                const products = {
                    products: {
                        ...cartItems.products,
                        [productId]: currentQuantity - 1
                    }
                };

                const updatedCartItems = await userService.addCartItems(token, products);
                setCartItems(updatedCartItems);
                
            }
  };

  const handleRemove = async (productId) => {
    const { [productId]: _, ...remainingProducts } = cartItems.products;
            const products = {
                products: remainingProducts
            };

            const updatedCartItems = await userService.addCartItems(token, products);
            setCartItems(updatedCartItems);
  };

  // const handleContinue = () => {
  //   navigate("/info-envio");
  // };

  // const handleBack = () => {
  //   navigate("/menu");
  // };

  return (
    <>
      {products.length === 0 ? (
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
                  <th scope="col">Precio por unidad</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio total por producto</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {/* Hamburguesas */}
                {products.map((product) => {
                  return (
                    <tr key={product}>
                      <td
                        style={{ textAlign: "center", verticalAlign: "middle" }}
                      >
                        <img
                          src={`http://localhost:8000${product.image}`}
                          alt={product.name}
                          style={{ width: "80px", height: "80px" }}
                        />
                      </td>
                      <td>
                        <b>{product.name} - </b> {product.description}
                      </td>
                      <td>${product.price.toLocaleString("es-CO")}</td>
                      <td style={{ textAlign: "center" }}>
                        <div className="quantity-controls">
                          <button
                            className="btn btn-outline-primary quantity-btn"
                            onClick={() => handleDecrement(product.id, "burguers")}
                          >
                            -
                          </button>
                          <span className="quantity-value">
                            {product.quantity}
                          </span>
                          <button
                            className="btn btn-outline-primary quantity-btn"
                            onClick={() => handleIncrement(product.id, "burguers")}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </td>
                      <td style={{ textAlign: "center" }}>${product.priceTotalProduct.toLocaleString("es-CO")}</td>
                      
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleRemove(product.id, "burguers")}
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
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ textAlign: "right" }}>
                    <b>Total: </b>
                  </td>
                  <td style={{ textAlign: "center" }}>$
                    {cartItems.total}
                  </td>
                  <td></td>
                  
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="btn-container">
            <button className="back-btn" 
            // onClick={handleBack}
            >
              Volver al menú
            </button>
            <button className="btn continue-btn" 
            // onClick={handleContinue}
            >
              Continuar
            </button>
          </div>
        </>
      )}
    </>
  );
};
