import axios from "axios"
const baseUrl = 'http://127.0.0.1:8000/product/products/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  const getProduct = (id) => {
    const request = axios.get(`${baseUrl}?id=${id}`);
    return request.then(response => response.data);
  };
// const getOutstandingBurguers = () => {
//     const request = axios.get(`${baseUrl}/outstanding/`)
//     return request.then(response => response.data)
// }

// const create = newObject => {
//     const request = axios.post(baseUrl,newObject)
//     return request.then(response => response.data)
// }

// const update = (id, newObject) => {
//     const request = axios.put(`${baseUrl}/${id}`,newObject)
//     return request.then(response => response.data)
// }

export default {
    getAll,
    getProduct
    // getOutstandingBurguers,
    // create,
    // update
    }