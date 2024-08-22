import React, { useState } from 'react';

export const UserCardEdit = () => {
  // Estado inicial con la información del usuario
  const [userInfo, setUserInfo] = useState({
    name: 'Diego Moreno',
    username: 'dmoreno',
    email: 'jaguirremo@unal.edu.co',
    age: 22,
    city: 'Medellín',
    country: 'Colombia',
    occupation: 'Ingeniero de sistemas',
    phone: '+57 3017549300',
    profilePicture: 'https://via.placeholder.com/150',
  });

  // Manejador de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  // Manejador del botón de guardar
  const handleSave = () => {
    // Aquí se podrían hacer operaciones para guardar la información, como una llamada a una API.
    alert('Información guardada');
  };

  return (
    <div style={styles.card}>
      <div style={styles.profileSection}>
        <img src={userInfo.profilePicture} alt={`${userInfo.name}'s profile`} style={styles.profilePicture} />
      </div>
      <div style={styles.info}>
        <form style={styles.form}>
          <div style={styles.formColumn}>
            <div style={styles.formGroup}>
              <label htmlFor="name"><strong>Nombre:</strong></label>
              <input
                type="text"
                id="name"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                style={styles.input}
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
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="age"><strong>Edad</strong></label>
              <input
                type="number"
                id="age"
                name="age"
                value={userInfo.age}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.formColumn}>
            <div style={styles.formGroup}>
              <label htmlFor="city"><strong>Ciudad:</strong></label>
              <input
                type="text"
                id="city"
                name="city"
                value={userInfo.city}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="country"><strong>País:</strong></label>
              <input
                type="text"
                id="country"
                name="country"
                value={userInfo.country}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="occupation"><strong>Ocupación:</strong></label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={userInfo.occupation}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="phone"><strong>Teléfono:</strong></label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>
        </form>
        <div style={styles.buttonContainer}>
            <button type="button" onClick={handleSave} style={styles.saveButton}>Guardar</button>
        </div>
      </div>
    </div>
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
    flexDirection: 'row',  // Cambiado a 'row' para dividir en dos columnas
    justifyContent: 'space-between',
  },
  formColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',  // Ajustado para dividir uniformemente el espacio
  },
  formGroup: {
    marginBottom: '5px',
    marginLeft: '10px',  // Añadido para separar los campos
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
  }
};

export default UserCardEdit;
