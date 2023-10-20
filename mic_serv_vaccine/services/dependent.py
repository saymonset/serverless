from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json

from config.mongodb  import   mongo
from models.genders  import   GenderModels
from repository.dependent import   crear_dependents_repo , checkUserDependent,get_dependentById_repo, get_dependents_repo, get_dependents_counts_repo, delete_dependent_repo, update_dependents_repo
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
def get_dependentsbyId_service(id):
    data = get_dependentById_repo(id)
    
    response_data = {
            'result': data,
    }
    response = Response(json.dumps(json.loads(json_util.dumps(response_data))), status=200, mimetype='application/json')
    return response

def delete_dependent_service(id):
    data = get_dependentById_repo(id)
    if data is not None:
        response =delete_dependent_repo(id)
        if response.deleted_count >= 1:
            return "El Dependiente ha sido eliminada correctamente", 200
        else:
            return "El Dependiente no fue encontrada", 404
    else:
         return "No existe registro para el id:"+id, 400


"""Actualizacion de depndent"""


def update_dependent_service(id, data):
    if len(data) == 0:
        return "No hay datos para actualizar", 400

    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        response = update_dependents_repo(id, data)
        if response.modified_count >= 1:
            return "Dependent ha sido actualizada correctamente", 200
        else:
            return "No se pudo actualizar", 404
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result    

 