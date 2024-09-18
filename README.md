# Crustaceo cascarudo
Página web del restaurante de Don Cangrejo

# Descripción
Este proyecto es una página web del restaurante de Don Cangrejo, el Crustáceo Cascarudo. En ella se pueden encontrar los platos que se sirven además de poder realizar pedidos.

## Tecnologías
### Frontend

- El frontend se inicializo con `vite` y se esta desarrollando con `React`.

### Backend
- El backend está desarrollado usando el framework `Django` de `Python`
- Se usa `django-rest-framework` para la creación de una API REST.
- Uso de `simplejwt`para uso de tokens
- Uso de `django-criptograpy` para encriptar datos
### Base de datos
- La base de datos usada es `PostgreSQL`

# Inicialización del proyecto
## Frontend

Para mostrar el frontend

- primero ingresamos a la carpeta frontend con:
`cd frontend`

- luego es necesario instalar las dependencias con:
`npm install`

- y para correr el proyecto usamos:
`npm run dev`

## Backend:
Para inicializar el backend ingresa a la carpeta del back con: `cd backend`

#### Entorno virtual
- Si no tienes un entorno virtual debes crearlo
```bash
$ python3 -m venv .venv
$ source .venv/bin/activate
$ pip install -r requirements.txt
```

#### Base de datos
`Windows`
- Asegurese de que en el archivo `.env` `POSTGRES_HOST='localhost'`
- Correr el contenedor de docker encargado de la base de datos
```bash
$ docker-compose -f "docker-compose-dev.yml" up -d
```

`Linux`
- Asegurese de que en el archivo `.env` `POSTGRES_HOST='172.17.0.1'`
- Correr el contenedor de docker encargado de la base de datos
```bash
$ sudo docker compose -f "docker-compose-dev.yml" up -d
```

- Aplicar las migraciones y correr el programa
```bash
$ python3 manage.py migrate
$ python3 manage.py runserver
```

### API's
#### Usuario
##### Inicio de sesión
> ***POST*** `http://127.0.0.1:8000/login/`

Recibe un JSON
```
{
    "username": "",
    "password": ""
}
```
Devuelve los token de `acceso` y de `refresh` 
```
{
    "refresh": "",
    "access": ""
}
```
##### Registro
##### Perfil
> ***GET*** `http://127.0.0.1:8000/user/profile/`

Recibe el token de acceso
```Authorization Bearer <token>```

Devuelve los token de `acceso` y de `refresh` 
```
{
    "id": 2,
    "username": "sarias",
    "email": "sarias@unal.edu.co",
    "first_name": "Sergio",
    "last_name": "Arias",
    "phone": "0987654321",
    "address": "Client Street 456",
    "birthdate": "1990-01-01",
    "type": "Client"
}
```
##### Carrito de compras
> ***GET*** `http://127.0.0.1:8000/user/shoppingcart/`

Recibe el token de acceso
```Authorization Bearer <token>```

Devuelve el carrito de compras
```
{
    "length": 0,
    "total": 0.0,
    "products": {}
}
```

> ***POST*** `http://127.0.0.1:8000/user/shoppingcart/`

Recibe el token de acceso
```Authorization Bearer <token>```

Recibe los productos
```
{
    "products": {
        "BUR1": 3,
        "FRI1": 1
    }
}
```

Devuelve el carrito de compras actualizado
```
{
    "length": 4,
    "total": 29.46,
    "products": {
        "BUR1": 3,
        "FRI1": 1
    }
}
```

#### Productos
> ***GET*** `http://127.0.0.1:8000/product/products/`

Devuelve *TODOS* los productos 
```
{
    "burguers": [
        {
            "id": "BUR2",
            "is_outstanding": false,
            "name": "Bacon Burguer",
            "description": "Juicy burger with crispy bacon, cheese, and BBQ sauce.",
            "price": 10.99,
            "score": 3.7,
            "image": null
        },
        {
            "id": "BUR1",
            "is_outstanding": true,
            "name": "Classic Burguer",
            "description": "A classic burger with lettuce, tomato, and cheese.",
            "price": 8.99,
            "score": 4.3,
            "image": null
        }
    ],
    "fries": [
        {
            "id": "FRI2",
            "name": "Sweet Potato Fries",
            "description": "Sweet potato fries with a hint of cinnamon.",
            "price": 2.99,
            "image": null
        },
        {
            "id": "FRI1",
            "name": "Regular Fries",
            "description": "Crispy golden fries.",
            "price": 2.49,
            "image": null
        }
    ],
    "drinks": [
        {
            "id": "DRI1",
            "name": "Coca-Cola",
            "description": "Refreshing Coca-Cola beverage.",
            "price": 1.99,
            "image": null
        },
        {
            "id": "DRI2",
            "name": "Orange Juice",
            "description": "Freshly squeezed orange juice.",
            "price": 2.99,
            "image": null
        }
    ]
}
```

> ***GET*** `http://127.0.0.1:8000/product/products/?id=pk`

Devuelve la información detallada del producto 
```
{
    "id": "BUR1",
    "is_outstanding": true,
    "name": "Classic Burguer",
    "description": "A classic burger with lettuce, tomato, and cheese.",
    "price": 8.99,
    "score": 4.3,
    "image": null
}
```

#### Compras/Ventas
> ***GET*** `http://127.0.0.1:8000/accounting/sales/`

Devuelve las compras hechas por el usuario
```
[
    {
        "id": 12,
        "price": 29.46,
        "created_at": "2024-09-17T22:01:18.918169-05:00"
    }
]
```

> ***POST*** `http://127.0.0.1:8000/accounting/sales/`

Realiza la compra, toma los productos que se encuentren en el carrito de compras
```
{
    "Compra realizada con éxito"
}
```
*** Si el carrito de compras está vacío o no hay stock suficiente ***
```
{
    Error: Detalle
}
```


> ***GET*** `http://127.0.0.1:8000/accounting/sales/?id=pk`

Devuelve la información detallada de la venta con ID `pk`
```
[
    {
        "product": "BUR1",
        "price": 26.97,
        "quantity": 3
    },
    {
        "product": "FRI1",
        "price": 2.49,
        "quantity": 1
    }
]
```