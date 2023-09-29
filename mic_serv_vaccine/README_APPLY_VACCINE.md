# Documentación del Router

Este proyecto implementa un router con las siguientes rutas:


## /applyVaccines

### GET /applyVaccines/{id}

Obtiene información sobre la apply_vacuna disponible por su id (id).
##La salida es:
{
    "result": {
        "_id": {
            "$oid": "65159f1311220ac8ec2478e3"
        },
        "vacinne_id": "65144b92e46e3c08b23e264a",
        "user_id": "6512edcb019d1c04dcd6a234",
        "family_id": "6512edcb019d1c04dcd6a234",
        "batch": "77502",
        "lote": "77502",
        "image": "https://www.paho.org/sites/default/files/styles/top_hero/public/2021-04/vaccine-safety-1500x810.jpg?h=b0b513fd&itok=icqAqx1k",
        "date": "2023-09-28T02:52:19.000Z",
        "status": true
    },
    "vaccine": null
}

### GET /applyVaccines/?limite={20}&desde={0}

Obtiene información sobre las apply_vaccines disponibles.
Es paginado con su limite  de paginas (limite) y de donde empieza a paginar (desde)
##La salida es  
 {
    "apply_vaccines": [
        {
            "_id": {
                "$oid": "65159dd9465a5058b4cd6461"
            },
            "batch": "77502",
            "date": "2023-09-28T02:52:19.000Z",
            "family_id": "6512edcb019d1c04dcd6a234",
            "image": "https://www.paho.org/sites/default/files/styles/top_hero/public/2021-04/vaccine-safety-1500x810.jpg?h=b0b513fd&itok=icqAqx1k",
            "lote": "77502",
            "status": true,
            "user_id": "6512edcb019d1c04dcd6a234",
            "vacinne_id": "65144b92e46e3c08b23e264a"
        },
    ],
    "desde": 0,
    "limite": 20,
    "total": 1
}

### POST /applyVaccines

Crea una nueva vacuna en la base de datos.
##Parametros de entrada obligatorios:
{
   
   "vacinne_id":"65144b92e46e3c08b23e264a",
   "user_id":"6512edcb019d1c04dcd6a234",
   "family_id":"6512edcb019d1c04dcd6a234",
   "batch":"77502",
   "lote": "77502",
   "image":"https://www.paho.org/sites/default/files/styles/top_hero/public/2021-04/vaccine-safety-1500x810.jpg?h=b0b513fd&itok=icqAqx1k",
   "date":"2023-09-28T02:52:19.000Z"
}
 

##La salida es  

{
    "batch": "77502",
    "date": "2023-09-28T02:52:19.000Z",
    "family_id": "6512edcb019d1c04dcd6a234",
    "id": "6516cff6cf426bdf2133d22d",
    "image": "https://www.paho.org/sites/default/files/styles/top_hero/public/2021-04/vaccine-safety-1500x810.jpg?h=b0b513fd&itok=icqAqx1k",
    "lote": "77502",
    "status": true,
    "user_id": "6512edcb019d1c04dcd6a234",
    "vacinne_id": "65144b92e46e3c08b23e264a"
}

### DELETE /applyVaccines/{id}

Elimina todas las vacunas de la base de datos por su id (id).

##La salida es:
  La vacuna ha sido eliminada correctamente

