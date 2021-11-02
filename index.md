[![Alquilando.app](https://www.alquilando.app/img/logo.webp "Alquilando")](https://www.alquilando.app/)
# Alquilando API

## Headers
Todas las peticiones deben de tener estas cabeceras:
|Header name|Content|
|-|-|
|access_key|*tu app token*|
|Content-Type|application/json|
|Accept|application/json|

>Para consegir el token de tu app, que se ha de incluir en la cabezera `access_key` debes de registrarte en la [API](home)

## Endpoins
- [/api/login](#login)
- [/api/user](#user)
- [/api/list](#list)
- [/api/user/{user id}](#Info)

### login
Autorizar al usuario
```
POST: /api/login
```

>**BODY**:
>```
>{
> "email": "user@email"
> "password": "user password"
>}
>```

Response:
> ```
> {
>  "name": "username",
>  "email": "user email,
>  "token": "user token",
>  "isOwner": if the user es owner or tenant
>}
>```
**El `token` hay que guardarlo para futuras peticiones.**

Si la respuesta contiene errores, la clave `error` contiene el código y en `message` el mensaje 

### user
Informacion del usuario logeado
```
GET: /api/user
```



Response:
> ```
>{
>  "currentTeam": "current team,
>  "user": {
>    "name": "username",
>    "email": "user email,
>	  "isOwner": if the user es owner or tenant,
>    "ownedProperties": [
>      {
>        "name": "casa 1",
>        "address": "dir 1",
>        "province": "pro1",
>        "condition": "Bien",
>        "price": "450.0",
>        "description": null,
>        "owner": "owner",
>        "links": {
>          "self": "/api/c/{casa}"
>        }
>      }
>    ],
>    "ownedTeams": [
>      {
>        "name": "Inquilinos de username",
>        "permissions": {
>          "update": true,
>          "delete": true
>        }
>      }
>    ],
>    "teamMembers": [
>      {
>        "name": "inquilino1",
>        "email": "user@email",
>        "links": {
>          "self": "/api/user/{user}"
>        }
>      },
>      {
>				...
>      }
>    ],
>    "rentedProperties": [Lista de propiedades que tiene alquiladas],
>    "links": {
>      "self": "/user/{user}"
>    }
>  }
>}
>```

Si la respuesta contiene errores, la clave `error` contiene el código y en `message` el mensaje

### list
Lista los inquilinos
```
GET: /api/list
```
Response:
>```
>{
>  "currentTeam": "Current team",
>  "data": [
>    {
>      "name": "inquilino1",
>      "email": "user@email",
>      "rentedProperties": [
>        {
>          "name": "casa 1",
>          "address": "dir 1",
>          "province": "pro1",
>          "condition": "Bien",
>          "price": "450.0",
>          "description": null,
>          "owner": "Benjamin",
>          "links": {
>            "self": "/api/c/{casa}"
>          }
>        }
>      ],
>      "links": {
>        "self": "/api/user/{user}"
>      }
>    },
>    {
>      "name": "inquilino2",
>      "email": "user@email",
>      "rentedProperties": [],
>      "links": {
>        "self": "/api/user/{user}"
>      }
>    }
>  ]
>}
>```

[home]:<https://alquilando.app/api>