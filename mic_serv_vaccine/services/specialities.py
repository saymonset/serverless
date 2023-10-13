from flask import request, Response, jsonify
from bson import json_util, ObjectId
from config.mongodb import mongo
from bson.json_util import dumps
import json
from models.specialities import  SpecialitiesModels
from services.vacc import  get_vaccine_service 
from repository.specialities import update_applyVaccine_repo, create_specialities_repo, get_specialities_repo,get_specialities_counts_repo
from repository.specialities import delete_speciality_repo, get_specialities_repo, find_one_applyVaccine_repo, get_specialities_list_repo
from repository.vacc import  get_vaccine_repo
from helps.utils import validar_object_id

"""Registro de vacunas"""
    
def create_specialities_service(speciality):
    status =  True
    if speciality:
        # Crea un nuevo documento de usuario
        specialitiesModels = SpecialitiesModels(speciality=speciality, 
                                                 status=status)
        response = create_specialities_repo(specialitiesModels)
 
        result = {
                "id": str(response.inserted_id),
                "speciality": speciality,
                "status": status
            }
        return result
    else:
        return "Invalid payload", 400

 


"""Obtiene las vacunas"""


def get_specialities_service(limite, desde):
    limite = int(limite)
    desde = int(desde)
    data = get_specialities_list_repo(limite, desde)
    result = json_util.dumps(data)
    total = get_specialities_counts_repo()
    diccionario = {
        'total': total,
        'limite':limite,
        'desde':desde,
        'specialities': json.loads(result)
    }
    return jsonify((diccionario))

"""Obtener una Vacuna"""


def get_specialitiesbyId_service(id):
    data = get_specialities_repo(id)
    response_data = {
            'result': data,
    }
    response = Response(json.dumps(json.loads(json_util.dumps(response_data))), status=200, mimetype='application/json')
    return response


"""Actualizacion de vacuna"""


def update_speciality_service(id, data):
    if len(data) == 0:
        return "No hay datos para actualizar", 400

    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        response = update_applyVaccine_repo(id, data)
        if response.modified_count >= 1:
            return "La speciality ah sido actualizada correctamente", 200
        else:
            return "La speciality no fue encontrada", 404
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result    

 


"""Eliminar una vacuna"""


def delete_specialities_service(id):
    data = get_specialities_repo(id)
    if data is not None:
        response =delete_speciality_repo(id)
        if response.deleted_count >= 1:
            return "La specialidad ha sido eliminada correctamente", 200
        else:
            return "La specialidad no fue encontrada", 404
    else:
         return "No existe registro para el id:"+id, 400       
