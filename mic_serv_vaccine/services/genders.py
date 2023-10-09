from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json

from config.mongodb  import   mongo
from models.genders  import   GenderModels
from repository.genders import   crear_genders_repo, get_genders_repo, get_genders_counts_repo
from repository.genders import   get_gender_repo, update_genders_repo, delete_genders_repo
from helps.utils import validar_object_id




"""Registro de objetos"""


def create_genders_service():
    data = request.get_json()
 
    name = data.get("name")
    if name:
         # Crea un nuevo documento de usuario
        genderModels = GenderModels(name=name, status=True)
        
        response = crear_genders_repo(genderModels)

        result = {
             "id": str(response.inserted_id),
             "name": name,
             "status": True
        }
        return result
    else:
        return "Invalid payload", 400


"""Obtiene las objetos"""


def get_gendersList_service():
    limite = int(request.args.get('limite', 15))
    desde = int(request.args.get('desde', 0))
    
    data = get_genders_repo(limite, desde)
    total = get_genders_counts_repo()

    result = json_util.dumps(data)
    diccionario = {
        'total': total,
        'limite':limite,
        'desde':desde,
        'genders': json.loads(result)
    }

    return jsonify(diccionario)

"""Obtener una objeto"""


def get_gender_service(id):
    data = get_gender_repo(id)
    result = json_util.dumps(data)
    return Response(result, mimetype="application/json")


"""Actualizacion de objeto"""


def update_genders_service(id):
    data = request.get_json()
    if len(data) == 0:
        return "No hay datos para actualizar", 400
   
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        response = update_genders_repo(id, data)
        if response.modified_count >= 1:
            return "Ha sido actualizada correctamente", 200
        else:
            return "No fue encontrada", 404
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result
    


"""Eliminar una objeto"""


def delete_genders_service(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        response = delete_genders_repo(id)
        if response.deleted_count >= 1:
            return "Se ha sido eliminada correctamente", 200
        else:
            return "No fue encontrada", 404
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result
    
