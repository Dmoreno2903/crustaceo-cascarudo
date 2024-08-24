import { createContext, useEffect, useState } from "react";
import { BURGUER, FRIES, DRINK } from "../dataMomentanea/productos";
import { COMPRAS } from "../dataMomentanea/compras";
import { CLIENT, ADMINISTRATOR } from "../dataMomentanea/users"; // base de datos estatica, luego hay que cambiarlo
import burguerService from "../services/burguers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
  const [menuToShow, setMenuToShow] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [active, setActive] = useState({
    fries: false,
    burguers: true,
    drinks: false,
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
    redirectToast
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
