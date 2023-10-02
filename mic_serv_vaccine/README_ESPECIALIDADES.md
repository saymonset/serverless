# Documentación del Router

Este proyecto implementa un router con las siguientes rutas:


## /specialities

### GET /specialities/{id}

Obtiene información sobre las especialidades disponible por su id (id).
##La salida es:
{
    "result": {
        "_id": {
            "$oid": "651ae6feddad21f8a62e6515"
        },
        "speciality": "Gastro",
        "status": true
    }
}

### GET /specialities/?limite={20}&desde={0}

Obtiene información sobre las especialidades disponibles.
Es paginado con su limite  de paginas (limite) y de donde empieza a paginar (desde)
##La salida es  
{
    "desde": 0,
    "limite": 15,
    "specialities": [
        {
            "_id": {
                "$oid": "651aecabc60b91860037566c"
            },
            "speciality": "GAstroenTeorologia",
            "status": true
        }
    ],
    "total": 1
}

### POST /specialities

Crea un speciality en la base de datos.
##Parametros de entrada obligatorios:
  {
   "speciality":"GAstroenTeorologia"
}
 
 

##La salida es  

{
    "id": "651aecabc60b91860037566c",
    "speciality": "GAstroenTeorologia",
    "status": true
}

### DELETE /specialities/{id}

Elimina todas la specialities de la base de datos por su id (id).

##La salida es:
  La cLa specialidad ha sido eliminada correctamente 

