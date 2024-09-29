import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';

export const UserCardEdit = () => {
  const { user, setUser } = useContext(AuthContext); 
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    first_name: user.first_name,
    email: user.email,
    last_name: user.last_name,
    phone: user.phone,
    birthdate: user.birthdate,
    address: user.address,
    image: user.image,
    username: user.username
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Actualizar la información del usuario en el contexto
    setUser((prevUser) => ({
      ...prevUser,
      ...userInfo,
    }));
    setIsEditing(false);
    alert('Información guardada');
  };

  return (
    <>
    <div style={styles.card}>
      <div style={styles.profileSection}>
        <img src={`http://127.0.0.1:8000${userInfo.image}`} alt={`${userInfo.name}'s profile`} style={styles.profilePicture} />
      </div>
      <div style={styles.info}>
        <form style={styles.form}>
          <div style={styles.formColumn}>
            <div style={styles.formGroup}>
              <label htmlFor="first_name"><strong>Nombre:</strong></label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={userInfo.first_name}
                onChange={handleChange}
                style={styles.input}
                disabled={!isEditing}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="last_name"><strong>Apellido:</strong></label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={userInfo.last_name}
                onChange={handleChange}
                style={styles.input}
                disabled={!isEditing}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="email"><strong>Email:</strong></label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                style={styles.input}
                disabled={!isEditing}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="username"><strong>Usuario:</strong></label>
              <input
                type="text"
                id="username"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
                style={styles.input}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div style={styles.formColumn}>
            <div style={styles.formGroup}>
              <label htmlFor="phone"><strong>Telefono:</strong></label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                style={styles.input}
                disabled={!isEditing}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="address"><strong>Dirección:</strong></label>
              <input
                type="text"
                id="address"
                name="address"
                value={userInfo.address}
                onChange={handleChange}
                style={styles.input}
                disabled={!isEditing}
              />
            </div>
          </div>
        </form>
        <div style={styles.buttonContainer}>
          {isEditing ? (
            <button type="button" onClick={handleSave} style={styles.saveButton}>
              Guardar
            </button>
          ) : (
            <button type="button" onClick={handleEdit} style={styles.editButton}>
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  // Centrar horizontalmente
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '30px',
    maxWidth: '760px',
    margin: '20px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
  },
  profilePicture: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    objectFit: 'cover',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  formGroup: {
    marginBottom: '5px',
    marginLeft: '10px',
  },
  input: {
    width: '100%',
    padding: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '1px',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  editButton: {
    backgroundColor: 'grey',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
  }
};

export default UserCardEdit;
