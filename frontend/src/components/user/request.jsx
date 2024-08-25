import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContextProvider";

export const OrderList = () => {
  const { compras, purchases } = useContext(AuthContext);
  const [ratings, setRatings] = useState([...compras]);

  const handleRatingChange = (e, index) => {
    const newRating = e.target.value;
    const updatedRatings = ratings.map((order, i) =>
      i === index ? { ...order, rating: newRating } : order
    );
    setRatings(updatedRatings);
  };

  const handleCommentChange = (e, index) => {
    const comment = e.target.value;
    const words = comment.trim().split(/\s+/);

    if (words.length <= 3) {
      const updatedRatings = ratings.map((order, i) =>
        i === index ? { ...order, comment } : order
      );
      setRatings(updatedRatings);
    }
  };

  const handleSave = () => {
    alert('Información guardada');
  };
  const [selectedValues, setSelectedValues] = useState({});

  const handleChange = (productId, event) => {
    setSelectedValues({
      ...selectedValues,
      [productId]: event.target.value,
    });
  };
  return (
    <div style={styles.listContainer}>
      <h3>Historial de compras</h3>
      <br />
      {purchases.length > 0 
      ? (
        purchases.map((purchase, index) => (
          <div key={index} style={styles.orderCard}>
            <div style={styles.orderInfo}>
              <div style={styles.orderField}>
                <strong>Fecha:</strong> {purchase.date}
              </div>
              <div style={styles.orderField}>
                <strong>Método de Pago:</strong> {purchase.paymentMethod}
              </div>
              <div style={styles.orderField}>
                <strong>Productos:</strong>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre del producto</th>
                      <th>Precio</th>
                      <th>Calificación</th>
                      <th>Comentario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchase.productList.map(product=>
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td >
                        <select
                          value={selectedValues[product.id] || 1}
                          onChange={(event) => handleChange(product.id, event)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                        </td>
                        <td>bueno</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div style={styles.orderField}>
                  <strong>Total:</strong> {purchase.total}
                </div>
              </div>
              {/* <div style={styles.orderField}>
                <strong>Calificación:</strong>
                <select
                  value={purchase.rating || ''}
                  onChange={(e) => handleRatingChange(e, index)}
                >
                  <option value="" disabled>
                    Selecciona una calificación
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div> */}
              {/* <div style={styles.orderField}>
                <strong>Comentario:</strong>
                <input
                  type="text"
                  value={purchase.comment || ''}
                  onChange={(e) => handleCommentChange(e, index)}
                  maxLength={20} // Limitar a 20 caracteres para asegurar 3 palabras máximo
                  placeholder="Máximo 3 palabras"
                  style={styles.commentInput}
                />
              </div>
              <button style={styles.saveButton} onClick={handleSave}>
                Guardar
              </button> */}
            </div>
          </div>
        ))
      ) : (
        <p>No se han realizado compras.</p>
      )}
    </div>
  );
};

const styles = {
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: '20px auto',
  },
  orderCard: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '10px',
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  orderInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  orderField: {
    marginBottom: '5px',
  },
  commentInput: {
    width: '100%',
  },
  saveButton: {
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#808080', // Color gris
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'center', // Centra el botón
  },
  
};

export default OrderList;