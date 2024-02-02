from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json

from config.mongodb  import   mongo
from models.vaccine  import   VaccineModels
from repository.vacc import   crear_vacuna_repo, get_vaccines_repo, get_vaccines_counts_repo
from repository.vacc import   get_vaccine_repo, update_vaccine_repo, delete_vaccine_repo
from helps.utils import validar_object_id




"""Registro de vacunas"""


def create_vaccine_service(data):
    name = data.get("name")
    description = data.get("description", None)
    disease_prevents = data.get("disease_prevents", None)
    application_age = data.get("application_age", None)
    isChildren = data.get("isChildren", False)
    status = data.get("status", False)
    if name:
         # Crea un nuevo documento de usuario
        vaccineModels = VaccineModels(name=name, description=description, 
                                       disease_prevents=disease_prevents, application_age=application_age, 
                                       isChildren=isChildren, status=status)
        
        response = crear_vacuna_repo(vaccineModels)

        result = {
             "id": str(response.inserted_id),
             "name": name,
             "description": description,
             "disease_prevents": disease_prevents,
             "application_age": application_age,
             "isChildren": isChildren,
             "status": True
        }
        return result
    else:
        return "Invalid payload", 400


"""Obtiene las vacunas"""


def get_vaccines_list_service(limite, desde, query):
    limite = int(limite)
    desde = int(desde)
    
    data = get_vaccines_repo(limite, desde,  query)
    total = get_vaccines_counts_repo(query)

    result = json_util.dumps(data)
    diccionario = {
        'total': total,
        'limite':limite,
        'desde':desde,
        'vaccines': json.loads(result)
    }

    return jsonify(diccionario)

"""Obtener una Vacuna"""


def get_vaccine_service(id):
    data = get_vaccine_repo(id)
    result = json_util.dumps(data)
    return Response(result, mimetype="application/json")


"""Actualizacion de vacuna"""


def update_vaccine_service(id, data):
    if len(data) == 0:
         
        return {
                "error":True,
                "resp":False,
                "TypeError": id,
                "statusCode": "uptdateBadCadena",
                "ValueError": "No hay datos para actualizar" ,
                "message": "No hay datos para actualizar" 
         }
   
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        response = update_vaccine_repo(id, data)
        if response.modified_count >= 0:
            return {
                "error":False,
                "resp":True,
                "TypeError": id,
                "statusCode": "uptdateSuccess",
                "ValueError": "La vacuna fue actualizada correctamente" ,
                "message": "La vacuna fue actualizada correctamente" 
         }
        else:
            return {
                "error":True,
                "resp":False,
                "TypeError": id,
                "statusCode": "uptdateNotFound",
                "ValueError": "La vacuna no fue encontrada" ,
                "message": "La vacuna no fue encontrada" 
         }
    else:
        # Maneja el error o muestra un mensaje de error
        
        return {
                "error":True,
                "resp":False,
                "TypeError": id,
                "statusCode": "400",
                "ValueError": "La cadena no es un ObjectId válido" ,
                "message": "La cadena no es un ObjectId válido" 
         }
    


"""Eliminar una vacuna"""


def delete_vaccine_service(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        response = delete_vaccine_repo(id)
        if response.deleted_count >= 1:
            return "La vacuna ha sido eliminada correctamente", 200
        else:
            return "La vacuna no fue encontrada", 404
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result
    
