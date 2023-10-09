# Documentación del Router

Este proyecto implementa un router con las siguientes rutas:


## /genders

### GET /genders/{id}

Obtiene información sobre el genero disponible por su id (id).
##La salida es:
{
    "_id": {
        "$oid": "652423ff89250816a2648892"
    },
    "name": "Masculino",
    "status": true
}

### GET /genders/?limite={20}&desde={0}

Obtiene información sobre los generos disponibles.
Es paginado con su limite  de paginas (limite) y de donde empieza a paginar (desde)
##La salida es  
 {
    "desde": 0,
    "limite": 20,
    "total": 2,
    "genders": [
        {
            "_id": {
                "$oid": "652423ff89250816a2648892"
            },
            "name": "Masculino",
            "status": true
        },
        {
            "_id": {
                "$oid": "6524240889250816a2648893"
            },
            "name": "Femenino",
            "status": true
        }
    ]
}

### POST /genders

Crea una nuevo genero en la base de datos.
##Parametros de entrada obligatorios:
{
   "name": "Femenino"
}
 
 

##La salida es  

{
    "id": "6524240889250816a2648893",
    "name": "Femenino",
    "status": true
}

### DELETE /genders/{id}

Elimina un genero de la base de datos por su id (id).

##La salida es:
 Se ha sido eliminada correctamente

