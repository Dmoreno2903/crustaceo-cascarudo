import { createContext, useEffect, useState } from "react";
import { BURGUER, FRIES, DRINK } from "../dataMomentanea/productos";
import { CLIENT, ADMINISTRATOR } from "../dataMomentanea/users"; // base de datos estatica, luego hay que cambiarlo
import products from "../services/products";
import userService from "../services/user";
import sales from "../services/solds";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import sadSong from '../assets/sounds/sadSong.m4a';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(null)

  const [user, setUser] = useState()
  const [cartItems, setCartItems] = useState({}
        )
  const [burguers, setBurguers] = useState(null);
  const [fries, setFries] = useState(null);
  const [drinks, setDrinks] = useState(null);
  const [compras, setCompras] = useState();

  const [salesUser, setSalesUser] = useState([])
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
  //recupera el perfil de usuario
  useEffect(()=> {
    if(token) {
      console.log(token);
    const fetchUserProfile = async () => {
      try {
        const userData = await userService.getUser(token);
        console.log("User Data:", userData);
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
      fetchUserProfile();
    }
  }, [token])

  useEffect(() => {
    if (token) {

      const fetchSales = async () => {
        try {
          const salesData = await sales.getSolds(token);
          console.log("Sales Data:", salesData);
          setSalesUser(salesData)
        } catch (error) {
          console.error("Error fetching sales data:", error);
        }
      };

      fetchSales();
    }
  }, [token]);

  //recupera los productos del backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await products.getAll();
        setBurguers(allProducts.burguers)
        setFries(allProducts.fries)
        setDrinks(allProducts.drinks)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  //recupera el carrito
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const cartData = await user.getCart(user); // Reemplaza "USER_ID" con el ID del usuario
  //       setCartItems(cartData);
  //     } catch (error) {
  //       console.error("Error fetching cart:", error);
  //     }
  //   };

  //   fetchCart();
  // }, []);

  const USERS = [
    ...CLIENT,
    ...ADMINISTRATOR
  ]
  
  // useEffect(() => {
  //   if(user) {
  //     setCartItems(user.cartItems)
  //     setPurchases(user.purchases)
  //   }
  //   else {
  //     setCartItems({
  //         "fries": { },
  //         "burguers": { },
  //         "drinks": { }
  //       })
  //   }
  // }, [user])

  // modifica el carrito de las listas estaticas cuando se actualiza el carrito
  // useEffect(()=>{
  //   if(user && user.type === 'Client'){
  //     // Encuentra y actualiza el usuario en la lista estática de Client
  //     const userIndex = CLIENT.findIndex(client => client.id === user.id)
  //     CLIENT[userIndex].cartItems = cartItems
  //     localStorage.setItem('username', JSON.stringify(CLIENT[userIndex]))
  //   }
  //   else if(user && user.type === 'Administrator'){
  //     // Encuentra y actualiza el usuario en la lista estática de Administrator
  //     const userIndex = ADMINISTRATOR.findIndex(admin => admin.id === user.id)
  //     ADMINISTRATOR[userIndex].cartItems = cartItems
  //     localStorage.setItem('username', JSON.stringify(ADMINISTRATOR[userIndex]))
  //   }
  // }, [cartItems])

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


  const contextData = {
    token,
    setToken,
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
    salesUser,
    purchases,
    redirectToast,
    playAudio
  };

  useEffect(() => {
    if (active && fries && burguers && drinks) {
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
    }
  }, [active, fries, burguers, drinks]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
