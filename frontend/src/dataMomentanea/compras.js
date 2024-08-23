//En productList se guardan los atributos exactamente como estaban al momento de confirmar la compra
//productlist no tiene nada que ver con los objetos del menu ya que estos pueden cambiar sus nombres o valores

export const COMPRAS = [
    {
        id:1,
        username: "sofi23",
        total: 75000,
        date: "22/08/2024",
        paymentMethod: "tarjeta", //tarjeta o efectivo
        productList: [{
            id:1, // id del producto comprado creado, es como si se creara un producto comprado en la base de datos
            idBurguer:1, // este es el id de la cangreburguer, la idea es usar esto y el atributo table para guardar los comentarios y los score de las burguers
            name: "Cangreburguer clásica",
            price: "25000",
            description: " Jugosa carne de cangrejo, lechuga crujiente, queso derretido, rodajas de tomate fresco, cebolla, pepinillos, y la inconfundible salsa secreta, todo entre un pan suave y esponjoso.",
            table: "burguers" // burguers, fries, drinks (esto esta en plural por la tabla a la que hace referencia)
        },
        {
            id:2, // id del producto comprado creado, es como si se creara un producto comprado en la base de datos
            idBurguer:1, // este es el id de la cangreburguer, la idea es usar esto y el atributo table para guardar los comentarios y los score de las burguers
            name: "Cangreburguer clásica",
            price: "25000",
            description: " Jugosa carne de cangrejo, lechuga crujiente, queso derretido, rodajas de tomate fresco, cebolla, pepinillos, y la inconfundible salsa secreta, todo entre un pan suave y esponjoso.",
            table: "burguers" // burguers, fries, drinks (esto esta en plural por la tabla a la que hace referencia)
        },
        {
            id:3, // id del producto comprado creado, es como si se creara un producto comprado en la base de datos
            idBurguer:1, // este es el id de la cangreburguer, la idea es usar esto y el atributo table para guardar los comentarios y los score de las burguers
            name: "Cangreburguer clásica",
            price: "25000",
            description: " Jugosa carne de cangrejo, lechuga crujiente, queso derretido, rodajas de tomate fresco, cebolla, pepinillos, y la inconfundible salsa secreta, todo entre un pan suave y esponjoso.",
            table: "burguers" // burguers, fries, drinks (esto esta en plural por la tabla a la que hace referencia)
        }
    ]},
    {
        id:2,
        username: "sebas23",
        total: 50000,
        date: "22/08/2024",
        paymentMethod: "tarjeta", //tarjeta o efectivo
        productList: [{
            id:4, // id del producto comprado creado, es como si se creara un producto comprado en la base de datos
            idBurguer:1, // este es el id de la cangreburguer, la idea es usar esto y el atributo table para guardar los comentarios y los score de las burguers
            name: "Cangreburguer clásica",
            price: "25000",
            description: " Jugosa carne de cangrejo, lechuga crujiente, queso derretido, rodajas de tomate fresco, cebolla, pepinillos, y la inconfundible salsa secreta, todo entre un pan suave y esponjoso.",
            table: "burguers" // burguers, fries, drinks (esto esta en plural por la tabla a la que hace referencia)
        },
        {
            id:5, // id del producto comprado creado, es como si se creara un producto comprado en la base de datos
            idBurguer:1, // este es el id de la cangreburguer, la idea es usar esto y el atributo table para guardar los comentarios y los score de las burguers
            name: "Cangreburguer clásica",
            price: "25000",
            description: " Jugosa carne de cangrejo, lechuga crujiente, queso derretido, rodajas de tomate fresco, cebolla, pepinillos, y la inconfundible salsa secreta, todo entre un pan suave y esponjoso.",
            table: "burguers" // burguers, fries, drinks (esto esta en plural por la tabla a la que hace referencia)
        }
    ]},
    {
        id:3, // id del producto comprado creado, es como si se creara un producto comprado en la base de datos
        username: "sofi23",
        total: 50000,
        date: "22/08/2024",
        paymentMethod: "tarjeta", //tarjeta o efectivo
        productList: [{
            id:6,
            idBurguer:1, // este es el id de la cangreburguer, la idea es usar esto y el atributo table para guardar los comentarios y los score de las burguers
            name: "Cangreburguer clásica",
            price: "25000",
            description: " Jugosa carne de cangrejo, lechuga crujiente, queso derretido, rodajas de tomate fresco, cebolla, pepinillos, y la inconfundible salsa secreta, todo entre un pan suave y esponjoso.",
            table: "burguers" // burguers, fries, drinks (esto esta en plural por la tabla a la que hace referencia)
        },
        {
            id:7, // id del producto comprado creado, es como si se creara un producto comprado en la base de datos
            idBurguer:1, // este es el id de la cangreburguer, la idea es usar esto y el atributo table para guardar los comentarios y los score de las burguers
            name: "Cangreburguer clásica",
            price: "25000",
            description: " Jugosa carne de cangrejo, lechuga crujiente, queso derretido, rodajas de tomate fresco, cebolla, pepinillos, y la inconfundible salsa secreta, todo entre un pan suave y esponjoso.",
            table: "burguers" // burguers, fries, drinks (esto esta en plural por la tabla a la que hace referencia)
        }
    ]},
    {
        id:4,
        username: "dmoreno",
        total: 50000,
        date: "22/08/2024",
        paymentMethod: "tarjeta", //tarjeta o efectivo
        productList: [{
            id:8, // id del producto comprado creado, es como si se creara un producto comprado en la base de datos
            idBurguer:1, // este es el id de la cangreburguer, la idea es usar esto y el atributo table para guardar los comentarios y los score de las burguers
            name: "Cangreburguer clásica",
            price: "25000",
            description: " Jugosa carne de cangrejo, lechuga crujiente, queso derretido, rodajas de tomate fresco, cebolla, pepinillos, y la inconfundible salsa secreta, todo entre un pan suave y esponjoso.",
            table: "burguers" // burguers, fries, drinks (esto esta en plural por la tabla a la que hace referencia)
        }
    ]}
]

