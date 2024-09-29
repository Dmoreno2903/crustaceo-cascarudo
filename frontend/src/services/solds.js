import axios from "axios"
const baseUrl = 'http://127.0.0.1:8000/accounting'


const getSolds = (token) => {
    const request = axios.get(`${baseUrl}/sales/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request.then(response => response.data);
  };

  const addSales = (token, cart) => {
    const request = axios.post(`${baseUrl}/sales/`, cart,  {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    return request.then(response => response.data);
  };

export default {
    getSolds,
    addSales
}