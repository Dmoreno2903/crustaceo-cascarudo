import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContextProvider";
import toast from 'react-hot-toast';
import axios from 'axios';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button style={styles.closeButton} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

const RatingModal = ({ isOpen, onClose, children}) => {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <button style={styles.closeButton} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

const OrderList = () => {
  const { token, salesUser } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [isRatingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingDetails, setRatingDetails] = useState([]);

  const handleSave = () => {
    toast.success('Información guardada');
  };

  const openModal = async (purchase) => {
    setModalOpen(true);

    // Fetch purchase details from API
    try {
      const response = await axios.get(`http://127.0.0.1:8000/accounting/sales/?id=${purchase.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPurchaseDetails(response.data);
    } catch (error) {
      toast.error('Error al obtener detalles de la compra');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setPurchaseDetails([]);
  };

  const OpenRatingModal = async (purchase) => {
    setRatingModalOpen(true);

    // Fetch purchase details from API
    try {
      const response = await axios.get(`http://127.0.0.1:8000/accounting/sales/?id=${purchase.id}&rating=true`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRatingDetails(response.data);
    } catch (error) {
      toast.error('Error al obtener detalles de la compra');
    }
  };

  const CloseRatingModal = () => {
    setRatingModalOpen(false);
    setRatingDetails([]);
  }

  return (
    <div style={styles.listContainer}>
      <h3>Historial de compras</h3>
      <br />
      {salesUser.length > 0 ? (
        salesUser.map((purchase) => (
          <div key={purchase.id} style={styles.orderCard}>
            <div style={styles.orderInfo}>
              <div style={styles.orderField}>
                <strong>ID:</strong> {purchase.id}
              </div>
              <div style={styles.orderField}>
                <strong>Precio:</strong> ${purchase.price.toFixed(2)}
              </div>
              <div style={styles.orderField}>
                <strong>Fecha:</strong> {new Date(purchase.created_at).toLocaleString()}
              </div>
              <button onClick={() => openModal(purchase)} style={styles.detailButton}>
                Ver detalles
              </button>
              <button onClick={() => OpenRatingModal(purchase)} style={styles.detailButton}>
                Calificar
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No se han realizado compras.</p>
      )}

      <Modal isOpen={isRatingModalOpen} onClose={CloseRatingModal}>
        <div>
          <h4>Calificación y comentario</h4>
          <h5>Calificación:</h5>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Calificación</th>
              </tr>
            </thead>
            <tbody>
              {ratingDetails.map((item, index) => (
                <tr key={index}>
                  <td>{item.product_name}</td>
                  <td>
                    <select
                      value={item.rating || 1} // Default to 1 if no rating is set
                      onChange={(e) => {
                        const newRating = e.target.value;
                        // Update the rating in your state or context
                        const updatedRatings = ratingDetails.map((detail, i) =>
                          i === index ? { ...detail, rating: newRating } : detail
                        );
                        setRatingDetails(updatedRatings); // Make sure you have this state
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={ CloseRatingModal } style={styles.detailButton}>
                Calificar
            </button>
        </div>
      </Modal>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {(
          <div>
            <h4>Detalles de la venta</h4>
            <h5>Productos:</h5>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {purchaseDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
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
  detailButton: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    width: '500px',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
};

export default OrderList;
