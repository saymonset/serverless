# Documentación del Router

Este proyecto implementa un router con las siguientes rutas:

## /vaccine

### GET /vaccine/{id}

Obtiene información sobre la vacuna disponible por su id (id).
##La salida es:
{
    "_id": {
        "$oid": "65144b92e46e3c08b23e264a"
    },
    "name": "COVID-19 Vaccine29",
    "description": "A vaccine to protect against COVID-19",
    "disease": "COVID-19",
    "dosis": "2 doses",
    "application_age": "16 years and older",
    "isChildren": true,
    "status": true
}

### GET /vaccine/?limite={20}&desde={0}

Obtiene información sobre las vacunas disponibles.
Es paginado con su limite  de paginas (limite) y de donde empieza a paginar (desde)
##La salida es  
  {
    "desde": 0,
    "limite": 20,
    "total": 1,
    "vaccines": [
        {
            "_id": {
                "$oid": "65144b92e46e3c08b23e264a"
            },
            "application_age": "16 years and older",
            "description": "A vaccine to protect against COVID-19",
            "disease": "COVID-19",
            "dosis": "2 doses",
            "isChildren": true,
            "name": "COVID-19 Vaccine29",
            "status": true
        }
    ]
}

### POST /vaccine

Crea una nueva vacuna en la base de datos.
##Parametros de entrada obligatorios:
{
  "name": "COVID-19 Vaccine29",
  "description": "A vaccine to protect against COVID-19",
  "disease": "COVID-19",
  "dosis": "2 doses",
  "application_age": "16 years and older",
  "isChildren": true
}

##La salida es  

{
    "application_age": "16 years and older",
    "description": "A vaccine to protect against COVID-19",
    "disease": "COVID-19",
    "dosis": "2 doses",
    "id": "651478642b4e00cfbbb37a46",
    "isChildren": true,
    "name": "COVID-20 Vaccine29",
    "status": true
}

### DELETE /vaccine/{id}

Elimina todas las vacunas de la base de datos por su id (id).

##La salida es:
  La vacuna ha sido eliminada correctamente
