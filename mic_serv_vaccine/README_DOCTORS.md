# Documentación del Router

Este proyecto implementa un router con las siguientes rutas:


## /doctors

### GET /doctors/{id}

Obtiene información sobre los doctores disponible por su id (id).
##La salida es:
{
    "result": {
        "_id": {
            "$oid": "651ae6daddad21f8a62e6514"
        },
        "user_id": "6512edcb019d1c04dcd6a234",
        "status": true
    }
}

### GET /doctors/?limite={20}&desde={0}

Obtiene información sobre los doctores disponibles.
Es paginado con su limite  de paginas (limite) y de donde empieza a paginar (desde)
##La salida es  
 {
    "desde": 0,
    "doctors": [
        {
            "_id": {
                "$oid": "651ae6daddad21f8a62e6514"
            },
            "status": true,
            "user_id": "6512edcb019d1c04dcd6a234"
        }
    ],
    "limite": 20,
    "total": 1
}

### POST /doctors

Crea un doctor en la base de datos.
##Parametros de entrada obligatorios:
{
   "user_id":"6512edcb019d1c04dcd6a234"
}
 

##La salida es  

{
    "id": "651ae6daddad21f8a62e6514",
    "status": true,
    "user_id": "6512edcb019d1c04dcd6a234"
}

### DELETE /doctors/{id}

Elimina el doctor de la base de datos por su id (id).

##La salida es:
  El Doctor ha sido eliminada correctamente

