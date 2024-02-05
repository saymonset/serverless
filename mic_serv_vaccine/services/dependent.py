from flask import Response, jsonify
from bson import json_util, ObjectId
import json
from datetime import datetime
from dateutil.relativedelta import relativedelta
from repository.dependent import   checkUserDependent, crear_dependents_repo ,get_dependentById_repo, get_dependents_repo, get_dependents_counts_repo, delete_dependent_repo, update_dependents_repo
from helps.utils import validar_object_id
from flask_jwt_extended import get_jwt_identity
from repository.user    import get_user_repo



"""Registro de objetos"""


def create_dependents_service(dependent_data, usuario):
    
    #dependent_data['user_id'] = usuario['_id']
    dependent_data['isUser'] = False
    #Validamos id pk de entrada
    user = get_user_repo(get_jwt_identity())
    dependent_data['user_id'] = user;
    try:
        # Intenta convertir la cadena en una fecha
       #birthDate = datetime.strptime(dependent_data["birth"], "%Y-%m-%dT%H:%M:%S.%f")
        birthDate = datetime.strptime(dependent_data["birth"].split("T")[0], "%Y-%m-%d")
        print("La fecha es válida.")
    except ValueError:
        print("La fecha no es válida.")
        birthDate = dependent_data["birth"]
    #

    
    
    dependent_data['user_id'] = get_jwt_identity()
    #dependent_data['isChildren'] = True if relativedelta(datetime.now(), birthDate).years < 18 else False
    # Obtener la fecha actual sin la parte de la hora
    currentDate = datetime.now().date()

    #birthDateStr = birthDate.strftime("%Y-%m-%dT%H:%M:%S.%f")
    dependent_data['isChildren'] = True if relativedelta(currentDate, birthDate.date()).years < 18 else False
    dependent_data['age'] = relativedelta(datetime.now(), birthDate.date()).years
    dependentNew = crear_dependents_repo(dependent_data)
    message = "Dependent was added successfully";
    response = {
        'statusCode': 201,
        "resp":True,
        "age":dependent_data['age'],
        "message":message,
        "dependentNew": json.loads(json_util.dumps(dependentNew))
    }
    return response

def get_dependents_service(id):
    data = checkUserDependent({"_id": ObjectId(event.pathParameters.id), 'isUser': False, 'user_id': user_id})
    result = json_util.dumps(data)
    return Response(result, mimetype="application/json")    
     


# """Obtiene las objetos"""


def get_dependentList_service(limite, desde, user_id, query):
    limite = int(limite)
    desde = int(desde)
   
    data = get_dependents_repo(limite, desde, user_id, query)
    total = get_dependents_counts_repo(user_id,  query)

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
    data = get_dependentsbyId_servicWithOutJson(id)
    
    response_data = {
            'result': data,
    }
    response = Response(json.dumps(json.loads(json_util.dumps(response_data))), status=200, mimetype='application/json')
    return response
def get_dependentsbyId_servicWithOutJson(id):
    data = get_dependentById_repo(id)
    
    return data

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
        # Obtener la fecha actual sin la parte de la hora
        currentDate = datetime.now().date()
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        try:
            # Intenta convertir la cadena en una fecha
            # birthDate = datetime.strptime(dependent_data["birth"], "%Y-%m-%dT%H:%M:%S.%f")
            birthDate = datetime.strptime(data["birth"].split("T")[0], "%Y-%m-%d")
            print("La fecha es válida.")
        except ValueError:
            print("La fecha no es válida.")
            birthDate = data["birth"]
            
        data['isChildren'] = True if relativedelta(currentDate, birthDate.date()).years < 18 else False
        data['age'] = relativedelta(datetime.now(), birthDate.date()).years
        response = update_dependents_repo(id, data)
        if response.modified_count >= 1:
            response = {
                'statusCode': 201,
                "resp": True,
                "message": "Dependent ha sido actualizada correctamente" 
            }
            return response
        else:
            response = {
                'statusCode': 201,
                "resp": True,
                "message": "Dependent ha sido actualizada correctamente" 
            }
            return response
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
            "TypeError": id,
            'statusCode': 500,
            "resp": False,
            "ValueError": "La cadena no es un ObjectId válido",
            "message": "La cadena no es un ObjectId válido"
        }
        return result


 