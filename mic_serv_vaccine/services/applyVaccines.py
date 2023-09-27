from flask import request, Response, jsonify
from bson import json_util, ObjectId
from config.mongodb import mongo
from bson.json_util import dumps
import json
from models.applyVaccines import  ApplyVaccineModels
from services.vacc import  get_vaccine_service 
from repository.applyVaccines import update_applyVaccine_repo, crear_applyVaccine_repo, get_applyVaccine_repo,get_applyVaccine_counts_repo
from repository.applyVaccines import delete_apply_vaccine_repo, get_applyVaccine_repo, find_one_applyVaccine_repo, get_applyVaccine_list_repo
from repository.vacc import  get_vaccine_repo
from helps.utils import validar_object_id

"""Registro de vacunas"""


def create_apply_vaccine_service():
    data = request.get_json()
    lote = data.get("lote", None)
    vacinne_id = data.get("vacinne_id", None)
    status = data.get("status", True)
    print(vacinne_id)
    if vacinne_id:
        # Crea un nuevo documento de usuario
        applyVaccineModels = ApplyVaccineModels(lote=lote, vacinne_id=vacinne_id, status=status)
        response = crear_applyVaccine_repo(applyVaccineModels)
 
        result = {
                "id": str(response.inserted_id),
                "lote": lote,
                "vacinne_id": vacinne_id,
                "status": status
            }
        return result
    else:
        return "Invalid payload", 400

 


"""Obtiene las vacunas"""


def get_applyVacciness_service():
    limite = int(request.args.get('limite', 15))
    desde = int(request.args.get('desde', 0))
    data = get_applyVaccine_list_repo(limite, desde)
    result = json_util.dumps(data)
    total = get_applyVaccine_counts_repo()
    diccionario = {
        'total': total,
        'limite':limite,
        'desde':desde,
        'apply_vaccines': json.loads(result)
    }
    return jsonify((diccionario))

"""Obtener una Vacuna"""


def get_apply__vaccine_service(id):
    data = get_applyVaccine_repo(id)
    vaccine = None
    if data is not None and data['vacinne_id'] is not None:
       vaccine = get_vaccine_repo(data['vacinne_id'])

    response_data = {
            'result': data,
            'vaccine':vaccine
    }
    response = Response(json.dumps(json.loads(json_util.dumps(response_data))), status=200, mimetype='application/json')
    return response


"""Actualizacion de vacuna"""


def update_apply_vaccine_service(id):
    data = request.get_json()
    if len(data) == 0:
        return "No hay datos para actualizar", 400

    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        response = update_applyVaccine_repo(id, data)
        if response.modified_count >= 1:
            return "La vaccine ah sido actualizada correctamente", 200
        else:
            return "La apply vaccine no fue encontrada", 404
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result    

 


"""Eliminar una vacuna"""


def delete_applyVaccines_service(id):
    data = get_applyVaccine_repo(id)
    if data is not None:
        response =delete_apply_vaccine_repo(id)
        if response.deleted_count >= 1:
            return "La vacuna ha sido eliminada correctamente", 200
        else:
            return "La vacuna no fue encontrada", 404
    else:
         return "No existe registro para el id:"+id, 400       
