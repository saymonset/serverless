from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json
from passlib.hash import pbkdf2_sha256
from config.mongodb  import   mongo
from repository.user import   update_status_user_repo, get_user_repo, get_user_repo_list, get_user_counts_repo, delete_user_repo, update_user_repo
from repository.dependent import    checkUserDependent, crear_dependents_repo
from helps.utils import validar_object_id




"""Registro de objetos"""


def create_user_service(user_data, usuario):
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
    message = ''
    if checkUserDependent({'user_id': user_id, 'isUser': True}) is None:
      crear_dependents_repo(user_data)
      update_status_user_repo(user_id, {'password': password, 'ci': ci, 'city': city, 'state': state} )
      message = f"user with ID {user_id} was created successfully"
    else:
      message = "User already exist";
      
    response = {
        'statusCode': 201,
        'message': message,
        "resp":True
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
        'users': json.loads(result)
    }

    # La informacion complementaria de cada usuario viene por la tabla dependents. Accedemos a la tabla
    # Dependents y tomamos la informacion que falta del usuario en la clave: more

    acumulado = []  # Crear una lista vacía para acumular los resultados
    for user in diccionario["users"]:
        user_id = user["_id"]["$oid"]
        data=get_userbyId_service_data(user_id)
        acumulado.append(data)  # Agregar cada resultado a la lista acumulada

    diccionario["users"] = json.loads(json_util.dumps(acumulado))  # Actualizar el diccionario con la lista acumulada

    return jsonify(diccionario)


def get_userbyId_service_data(id):
        data = get_user_repo(id)
        dependent_is_user = checkUserDependent({'isUser': True, "user_id":ObjectId(id) })
        dependent_is_user = json_util.dumps(dependent_is_user)
        
        response_data = {
                'user': data,
                'more': json.loads(dependent_is_user),
        }
        return response_data 

# """Obtener una objeto"""
def get_userbyId_service(id):
    data = get_user_repo(id)
    dependent_is_user = checkUserDependent({'isUser': True, "user_id":ObjectId(id) })
    dependent_is_user = json_util.dumps(dependent_is_user)
 
    response = Response(json.dumps(json.loads(json_util.dumps(get_userbyId_service_data(id)))), status=200, mimetype='application/json')
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
        password = pbkdf2_sha256.hash(data['password'])
        data['password']=password;
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
