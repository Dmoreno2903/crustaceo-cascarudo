import axios from "axios"
const baseUrl = 'http://127.0.0.1:8000/login/'

const getToken = (data) => {
    const request = axios.post(`${baseUrl}`,{
        username: data.username,
        password: data.password
    })
    return request.then(response => response.data)
}


export default {
    getToken
}