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
```

#### Base de datos
`Windows`
- Correr el contenedor de docker encargado de la base de datos
```bash
$ docker-compose -f "docker-compose-dev.yml" up -d
```

`Linux`
- Correr el contenedor de docker encargado de la base de datos
```bash
$ sudo docker compose -f "docker-compose-dev.yml" up -d
```

- Aplicar las migraciones y correr el programa
```bash
$ python3 manage.py migrate
$ python3 manage.py runserver
```
