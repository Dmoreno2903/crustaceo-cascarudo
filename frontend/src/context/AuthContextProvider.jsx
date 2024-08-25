import { createContext, useEffect, useState } from "react";
import { BURGUER, FRIES, DRINK } from "../dataMomentanea/productos";
import { COMPRAS } from "../dataMomentanea/compras";
import { CLIENT, ADMINISTRATOR } from "../dataMomentanea/users"; // base de datos estatica, luego hay que cambiarlo
import burguerService from "../services/burguers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import sadSong from '../assets/sounds/sadSong.m4a';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate()
  
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
  const [compras, setCompras] = useState(COMPRAS);

  
  const [purchases, setPurchases] = useState([])

  const [menuToShow, setMenuToShow] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [active, setActive] = useState({
    fries: false,
    burguers: true,
    drinks: false,
  });
  const [audio] = useState(new Audio(sadSong)); // Crear una instancia de Audio y guardarla en el estado

  const playAudio = () => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  };


  const USERS = [
    ...CLIENT,
    ...ADMINISTRATOR
  ]
  
  useEffect(() => {
    if(user) {
      setCartItems(user.cartItems)
      setPurchases(user.purchases)
    }
    else {
      setCartItems({
          "fries": { },
          "burguers": { },
          "drinks": { }
        })
    }
  }, [user])

  // modifica el carrito de las listas estaticas cuando se actualiza el carrito
  useEffect(()=>{
    if(user && user.type === 'Client'){
      // Encuentra y actualiza el usuario en la lista estática de Client
      const userIndex = CLIENT.findIndex(client => client.id === user.id)
      CLIENT[userIndex].cartItems = cartItems
      localStorage.setItem('username', JSON.stringify(CLIENT[userIndex]))
    }
    else if(user && user.type === 'Administrator'){
      // Encuentra y actualiza el usuario en la lista estática de Administrator
      const userIndex = ADMINISTRATOR.findIndex(admin => admin.id === user.id)
      ADMINISTRATOR[userIndex].cartItems = cartItems
      localStorage.setItem('username', JSON.stringify(CLIENT[userIndex]))
    }
  }, [cartItems])

  const onClick = (a) => {
    let activeNuevo = {
      fries: false,
      burguers: false,
      drinks: false,
    };
    activeNuevo[a] = true;
    setActive(activeNuevo);
  };

  const updateCartItem = (productId, category, newQuantity) => {
    setCartItems((prevCartItems) => {
      const updatedCategory = {
        ...prevCartItems[category],
        [productId]: newQuantity,
      };
      return { ...prevCartItems, [category]: updatedCategory };
    });
  };

  const removeCartItem = (productId, category) => {
    setCartItems((prevCartItems) => {
      const updatedCategory = { ...prevCartItems[category] };
      delete updatedCategory[productId];
      return { ...prevCartItems, [category]: updatedCategory };
    });
  };

  const redirectToast = () => {
    toast((t)=>{
      const navigateLogin = ()=>{
        navigate('/inicio-de-sesion')
        toast.dismiss(t.id)
      }
      const navigateRegister = ()=>{
        navigate('/registro')
        toast.dismiss(t.id)
      }
      const cancel = () =>{
        toast.dismiss(t.id)
      }
      return(
        <>
        
        <div>
          No has iniciado sesion
          <br/>
          <div>
            <button onClick={navigateLogin}>
              Iniciar sesion
            </button>
            <button onClick={navigateRegister}>
              Crear cuenta
            </button>
            <button onClick={cancel}>
              cancelar
            </button>
          </div>
        </div>
        
        </>
      )
    },
    {
      duration: 4000,
      id: 'clipboard',
    })
  }

  // Filtrar las compras realizadas por el usuario activo
  useEffect(() => {
    if (user) {
      const userCompras = COMPRAS.filter(
        (compra) => compra.username === user.username
      ).map((compra) => ({
        date: compra.date,
        total: compra.total,
        paymentMethod: compra.paymentMethod,
        productNames: compra.productList.map((product) => product.name),
      }));
      setCompras(userCompras);
    }
  }, [user]);

  
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
    CLIENT,
    USERS,
    compras,
    purchases,
    redirectToast,
    playAudio
  };

  useEffect(() => {
    const selectedList = Object.keys(active).find((prop) => active[prop]);
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
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
