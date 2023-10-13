from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json

from config.mongodb  import   mongo
from models.genders  import   GenderModels
from repository.dependent import   crear_dependents_repo , checkUserDependent, get_dependents_repo, get_dependents_counts_repo
from helps.utils import validar_object_id




"""Registro de objetos"""


def create_dependents_service(dependent_data, usuario):
    
    dependent_data['user_id'] = usuario['_id']
    dependent_data['isUser'] = False
    crear_dependents_repo(dependent_data)
    body = json.dumps( { 'message' : f"Dependent was added successfully"}) 
    response = {
        'statusCode': 201,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        'body': body
    }
    return response

def get_dependents_service(id):
    data = checkUserDependent({"_id": ObjectId(event.pathParameters.id), 'isUser': False, 'user_id': user_id})
    result = json_util.dumps(data)
    return Response(result, mimetype="application/json")    
     


# """Obtiene las objetos"""


def get_dependentList_service(limite, desde, user_id):
    limite = int(limite)
    desde = int(desde)
    
    data = get_dependents_repo(limite, desde, user_id)
    total = get_dependents_counts_repo(user_id)

    result = json_util.dumps(data)
    diccionario = {
        'total': total,
        'limite':limite,
        'desde':desde,
        'dependents': json.loads(result)
    }

    return jsonify(diccionario)

# """Obtener una objeto"""


# def get_gender_service(id):
#     data = get_gender_repo(id)
#     result = json_util.dumps(data)
#     return Response(result, mimetype="application/json")


# """Actualizacion de objeto"""


# def update_genders_service(id, data):
#     #data = request.get_json()
#     if len(data) == 0:
#         return "No hay datos para actualizar", 400
   
#     if validar_object_id(id):
#         # La cadena es un ObjectId válido
#         # Realiza las operaciones necesarias
#         response = update_genders_repo(id, data)
#         if response.modified_count >= 1:
#             return "Ha sido actualizada correctamente", 200
#         else:
#             return "No fue encontrada", 404
#     else:
#         # Maneja el error o muestra un mensaje de error
#         result = {
#              "TypeError": id,
#              "ValueError": "La cadena no es un ObjectId válido" 
#         }
#         return result
    


# """Eliminar una objeto"""


# def delete_genders_service(id):
#     if validar_object_id(id):
#         # La cadena es un ObjectId válido
#         # Realiza las operaciones necesarias
#         response = delete_genders_repo(id)
#         if response.deleted_count >= 1:
#             return "Se ha sido eliminada correctamente", 200
#         else:
#             return "No fue encontrada", 404
#     else:
#         # Maneja el error o muestra un mensaje de error
#         result = {
#              "TypeError": id,
#              "ValueError": "La cadena no es un ObjectId válido" 
#         }
#         return result
    
