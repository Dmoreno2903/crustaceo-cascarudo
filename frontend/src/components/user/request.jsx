import React, {useContext} from 'react';
import { AuthContext } from "../../context/AuthContextProvider";

export const OrderList = () => {

  const { compras } = useContext(AuthContext);

  return (
    <div style={styles.listContainer}>
      <h3>Historial de compras</h3>
      <br></br>
      {compras.length > 0 ? (
        compras.map((order, index) => (
          <div key={index} style={styles.orderCard}>
            <div style={styles.orderInfo}>
              <div style={styles.orderField}>
                <strong>Fecha:</strong> {order.date}
              </div>
              <div style={styles.orderField}>
                <strong>Total:</strong> {order.total}
              </div>
              <div style={styles.orderField}>
                <strong>Método de Pago:</strong> {order.paymentMethod}
              </div>
              <div style={styles.orderField}>
                <strong>Productos:</strong> {order.productNames.join(', ')}
              </div>
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
};

export default OrderList;
