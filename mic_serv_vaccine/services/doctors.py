from flask import request, Response, jsonify
from bson import json_util, ObjectId
from config.mongodb import mongo
from bson.json_util import dumps
import json
from models.doctors import  DoctorsModels
from services.vacc import  get_vaccine_service 
from repository.doctors import update_doctors_repo, create_doctors_repo, get_doctor_repo,get_doctors_counts_repo, get_doctors_list_repo
from repository.doctors import delete_doctor_repo,  find_one_applyVaccine_repo
from repository.vacc import  get_vaccine_repo
from helps.utils import validar_object_id

"""Registro de vacunas"""
    
def create_doctors_service(data):
    user_id = data.get("user_id")
    status = data.get("status", True)
    if user_id:
        # Crea un nuevo documento de usuario
        doctorsModels = DoctorsModels(user_id=user_id, 
                                                 status=status)
        response = create_doctors_repo(doctorsModels)
 
        result = {
                "id": str(response.inserted_id),
                "user_id": user_id,
                "status": status
            }
        return result
    else:
        return "Invalid payload", 400

 


"""Obtiene las vacunas"""


def get_doctors_list_service(limite, desde):
    limite = int(limite)
    desde = int(desde)
    data = get_doctors_list_repo(limite, desde)
    result = json_util.dumps(data)
    total = get_doctors_counts_repo()
    diccionario = {
        'total': total,
        'limite':limite,
        'desde':desde,
        'doctors': json.loads(result)
    }
    return jsonify((diccionario))

"""Obtener una Vacuna"""


def get_doctorsbyId_service(id):
    data = get_doctor_repo(id)
    response_data = {
            'result': data,
    }
    response = Response(json.dumps(json.loads(json_util.dumps(response_data))), status=200, mimetype='application/json')
    return response


"""Actualizacion de vacuna"""


def update_doctors_service(id, data):
    if len(data) == 0:
        return "No hay datos para actualizar", 400

    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        response = update_doctors_repo(id, data)
        if response.modified_count >= 1:
            return "La doctors ah sido actualizada correctamente", 200
        else:
            return "No se pudo actualizar", 404
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result    

 


"""Eliminar una vacuna"""


def delete_doctor_service(id):
    data = get_doctor_repo(id)
    if data is not None:
        response =delete_doctor_repo(id)
        if response.deleted_count >= 1:
            return "El Doctor ha sido eliminada correctamente", 200
        else:
            return "El Doctor no fue encontrada", 404
    else:
         return "No existe registro para el id:"+id, 400       
