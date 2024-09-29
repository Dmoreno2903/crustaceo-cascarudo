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

export default {
    getSolds
}