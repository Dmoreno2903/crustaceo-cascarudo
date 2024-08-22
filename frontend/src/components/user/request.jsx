import React from 'react';

export const OrderList = () => {
  // Lista de pedidos (puedes reemplazar esto con datos reales o provenir de un estado)
  const orders = [
    {
      id: 1,
      date: '2024-08-22',
      value: '$50.00',
      address: '123 Main St, Nueva York, Estados Unidos',
    },
    {
      id: 2,
      date: '2024-08-21',
      value: '$75.00',
      address: '456 Elm St, Los Angeles, Estados Unidos',
    },
    {
      id: 3,
      date: '2024-08-20',
      value: '$120.00',
      address: '789 Maple Ave, Chicago, Estados Unidos',
    },
  ];

  return (
    <div style={styles.listContainer}>
      {orders.map((order) => (
        <div key={order.id} style={styles.orderCard}>
          <div style={styles.orderInfo}>
            <div style={styles.orderField}>
              <strong>Fecha:</strong> {order.date}
            </div>
            <div style={styles.orderField}>
              <strong>Valor:</strong> {order.value}
            </div>
            <div style={styles.orderField}>
              <strong>Dirección:</strong> {order.address}
            </div>
          </div>
        </div>
      ))}
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
