import { createContext, useEffect, useState } from 'react';
import { BURGUER, FRIES, DRINK } from '../dataMomentanea/productos';
import {CLIENT, ADMINISTRATOR} from '../dataMomentanea/users'// base de datos estatica, luego hay que cambiarlo
import burguerService from '../services/burguers';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('username'))
  })
  const [cartItems, setCartItems] = useState({
        "fries": { },
        "burguers": { },
        "drinks": { }
      })
  const [burguers, setBurguers] = useState(BURGUER);
  const [fries, setFries] = useState(FRIES);
  const [drinks, setDrinks] = useState(DRINK);
  const [menuToShow, setMenuToShow] = useState([]);
  const [selectedList, setSelectedList] = useState('');
  const [active, setActive] = useState({
    "fries": false,
    "burguers": true,
    "drinks": false
  });
  const USERS = [
    ...CLIENT,
    ...ADMINISTRATOR
  ]
  
  useEffect(() => {
    if(user) {
      setCartItems(user.cartItems)
    }
    else {
      setCartItems({
          "fries": { },
          "burguers": { },
          "drinks": { }
        })
    }
  }, [user])

  const onClick = (a) => {
    let activeNuevo = {
      "fries": false,
      "burguers": false,
      "drinks": false
    };
    activeNuevo[a] = true;
    setActive(activeNuevo);
  };

  const updateCartItem = (productId, category, newQuantity) => {
    setCartItems(prevCartItems => {
      const updatedCategory = { ...prevCartItems[category], [productId]: newQuantity };
      return { ...prevCartItems, [category]: updatedCategory };
    });
  };

  const removeCartItem = (productId, category) => {
    setCartItems(prevCartItems => {
      const updatedCategory = { ...prevCartItems[category] };
      delete updatedCategory[productId];
      return { ...prevCartItems, [category]: updatedCategory };
    });
  };

  const updateClientData = (updatedClient) => {
    const updatedUsers = CLIENT.map(client =>
      client.id === updatedClient.id ? updatedClient : client
    );
    setUser(updatedClient);
  }

  
  const contextData = {
    user,
    setUser,
    active,
    setActive,
    onClick,
    burguers,
    setBurguers,
    fries,
    setFries,
    drinks,
    setDrinks,
    menuToShow,
    selectedList,
    cartItems,
    setCartItems,
    updateCartItem,
    removeCartItem,
    USERS
  };

  
  useEffect(() => {
    const selectedList = Object.keys(active).find(prop => active[prop]);
    if (selectedList === "fries") {
      setMenuToShow([...fries]);
      setSelectedList("fries");
    } else if (selectedList === "burguers") {
      setMenuToShow([...burguers]);
      setSelectedList("burguers");
    } else if (selectedList === "drinks") {
      setMenuToShow([...drinks]);
      setSelectedList("drinks");
    }
  }, [active]);

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
