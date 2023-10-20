from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json
from passlib.hash import pbkdf2_sha256
from config.mongodb  import   mongo
from repository.user import   update_status_user_repo, get_user_repo, get_user_repo_list, get_user_counts_repo, delete_user_repo, update_user_repo
from repository.dependent import   checkUserDependent, crear_dependents_repo
from helps.utils import validar_object_id




"""Registro de objetos"""


def create_user_service(user_data, usuario):
    print(user_data)
    print(usuario)
    user_id = usuario['_id']
    ci = user_data['ci']
    city = user_data['city']
    state = user_data['state']
    password = pbkdf2_sha256.hash(user_data['password'])
    del user_data['password']
    del user_data['ci']
    del user_data['city']
    del user_data['state']
    user_data['isUser'] = True
    user_data['user_id'] = user_id
    if checkUserDependent({'user_id': user_id, 'isUser': True}) is None:
      crear_dependents_repo(user_data)
      update_status_user_repo(user_id, {'password': password, 'ci': ci, 'city': city, 'state': state} )
      body = json.dumps( { 'message' : f"user with ID {user_id} was created successfully"}) 
    else:
      body = json.dumps( { 'message' : f"User already exist"}) 
    response = {
        'statusCode': 201,
        'headers': {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': True,
        },
        'body': body
    }
    return response


def get_userList_service(limite, desde):
    limite = int(limite)
    desde = int(desde)
    
    data = get_user_repo_list(limite, desde)
    total = get_user_counts_repo()

    result = json_util.dumps(data)
    diccionario = {
        'total': total,
        'limite':limite,
        'desde':desde,
        'dependents': json.loads(result)
    }

    return jsonify(diccionario)

# """Obtener una objeto"""
def get_userbyId_service(id):
    data = get_user_repo(id)
    
    response_data = {
            'result': data,
    }
    response = Response(json.dumps(json.loads(json_util.dumps(response_data))), status=200, mimetype='application/json')
    return response 

def delete_user_service(id):
    data = get_user_repo(id)
    if data is not None:
        response =delete_user_repo(id)
        if response.deleted_count >= 1:
            return "El Usuario ha sido eliminada correctamente", 200
        else:
            return "El Usuario no fue encontrada", 404
    else:
         return "No existe registro para el id:"+id, 400


"""Actualizacion de vacuna"""


def update_user_service(id, data):
    if len(data) == 0:
        return "No hay datos para actualizar", 400

    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        print(id)
        print(data)
        response = update_user_repo(id, data)
        if response.modified_count >= 1:
            return "Usuario ha sido actualizada correctamente", 200
        else:
            return "No se pudo actualizar", 404
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result    
