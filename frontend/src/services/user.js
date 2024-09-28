import axios from "axios"
const baseUrl = 'http://127.0.0.1:8000/user'


const getCart = async (token) => {
    try {
        const response = await axios.get(`${baseUrl}/shoppingcart/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

  const getUser = async (token) => {
    try {
        const response = await axios.get(`${baseUrl}/profile/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}




export default {
    getCart,
    getUser
}