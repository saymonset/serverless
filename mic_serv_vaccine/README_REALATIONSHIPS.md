# Documentación del Router

Este proyecto implementa un router con las siguientes rutas:


## /relationships

### GET /relationships/{id}

Obtiene información sobre el relationships disponible por su id (id).
##La salida es:
{
    "_id": {
        "$oid": "65245dd446d1cf0d60ee9d24"
    },
    "name": "Hermano",
    "status": true
}

### GET /relationships/?limite={20}&desde={0}

Obtiene información sobre los relationships disponibles.
Es paginado con su limite  de paginas (limite) y de donde empieza a paginar (desde)
##La salida es  
{
    "desde": 0,
    "relationships": [
        {
            "_id": {
                "$oid": "65245dd446d1cf0d60ee9d24"
            },
            "name": "Hermano",
            "status": true
        }
    ],
    "limite": 20,
    "total": 1
}

### POST /relationships

Crea una nuevo relacion del usuario con sus familiares o dependientes en la base de datos.

##Parametros de entrada obligatorios:
{
   "name": "Hermano"
}
 
 

##La salida es  

{
    "id": "65245dd446d1cf0d60ee9d24",
    "name": "Hermano",
    "status": true
}

### DELETE /relationships/{id}

Elimina un genero de la base de datos por su id (id).

##La salida es:
 Se ha sido eliminada correctamente

