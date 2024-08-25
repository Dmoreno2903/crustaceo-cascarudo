export const CLIENT = [{
        id:1,
        type: "Client",
        name: 'Diego Moreno',
        username: 'dmoreno',
        password: "hola",
        email: 'jaguirremo@unal.edu.co',
        age: 22,
        city: 'Medellín',
        country: 'Colombia',
        occupation: 'Ingeniero de sistemas',
        address: 'calle 8',
        phone: 3017549300,
        accountType: 'Ahorro', //solo ahorro o corriente
        accountNumber: 74,
        profilePicture: 'https://via.placeholder.com/150',
        cartItems: {
          "fries": { },
          "burguers": { },
          "drinks": { }
        },
        purchases: []
      },
      {
        id:2,
        type: "Client",
        name: 'Sofi',
        username: 'sofi23',
        password: "hola1",
        email: 'sofi@unal.edu.co',
        age: 22,
        city: 'Medellín',
        country: 'Colombia',
        occupation: 'Ingeniera de sistemas',
        address: 'calle 9',
        phone: '+57 3017549300',
        accountType: 'Corriente', //solo ahorro o corriente
        accountNumber: 84,
        profilePicture: 'https://via.placeholder.com/150',
        cartItems: {
          "fries": { "1": 2, "3": 3 },
          "burguers": { "1": 3 },
          "drinks": { "2": 2 }
        },
        purchases: [
          {
            id: 1,
            total: 114000,
            date: "22/08/2024",
            paymentMethod: "tarjeta", //tarjeta o efectivo
            productList: [{
                id: 1, // id propio
                idMenu: 1, // id del producto que compro
                name: "Cangreburguer clásica",
                quantity: 2,
                price: "28000",
                table: "burguers", // burguers, fries, drinks (esto esta en plural por la tabla a la que hace referencia)
                score: 4,
                comment: ""
            },
            {
                id:2, // id propio
                idmenu:2, // id del producto del menu
                name: "Cangreburger Especial",
                quantity: 2,
                price: "29000",
                table: "burguers", // burguers, fries, drinks (esto esta en plural por la tabla a la que hace referencia)
                score: 4,
                comment: ""
            }]
          }]
      },
      {
        id: 3,
        type: "Client",
        name: 'Sebas',
        username: 'sebas23',
        password: "hola2",
        email: 'sebas@unal.edu.co',
        age: 22,
        city: 'Medellín',
        country: 'Colombia',
        occupation: 'Ingeniero de sistemas',
        address: 'calle 10',
        phone: '+57 3017549300',
        accountType: 'Corriente', //solo ahorro o corriente
        accountNumber: 85,
        profilePicture: 'https://via.placeholder.com/150',
        cartItems: {
          "fries": { "1": 2, "3": 3 },
          "burguers": { "1": 3 },
          "drinks": { "2": 2 }
        },
        purchases: []
      },
]

export const ADMINISTRATOR = [
    {
        id:1,
        type: "Administrator",
        name: 'Sergio',
        username: 'sarias',
        password: "hola3",
        email: 'sarias@unal.edu.co',
        age: 26,
        city: 'Medellín',
        country: 'Colombia',
        occupation: 'Ingeniero de sistemas',
        address: 'calle 11',
        phone: '+57 3017549300',
        accountType: 'corriente', //solo ahorro o corriente
        accountNumber: 95,
        profilePicture: 'https://via.placeholder.com/150',
        cartItems: {
          "fries": { "1": 2, "3": 3 },
          "burguers": { "1": 3 },
          "drinks": { "2": 2 }
        },
        purchases: []
      }
]