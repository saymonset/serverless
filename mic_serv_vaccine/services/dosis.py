from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json

from config.mongodb  import   mongo
from models.dosis  import   DosisModels
from repository.dosis import   crear_dosis_repo, get_dosis_repoLst, get_dosis_counts_repo
from repository.dosis import   get_dosis_repo, update_dosis_repo, delete_dosis_repo, get_dosis_ByVaccine
from helps.utils import validar_object_id
from repository.vacc import   get_vaccine_repo



"""Registro de dosiss"""


def create_dosis_service(data):
    vacinne_id = data.get("vacinne_id")
    name = data.get("name")
    age_frequency = data.get("age_frequency", None)
    expires_in_days = data.get("expires_in_days", -1)
    rowReporte = data.get("rowReporte", None)
    columnReporte = data.get("columnReporte", None)
    status = data.get("status", True)
    if vacinne_id:
         # Crea un nuevo documento de usuario
        dosisModels = DosisModels(name=name, vacinne_id=vacinne_id, 
                                       age_frequency=age_frequency, 
                                       expires_in_days= expires_in_days,
                                       rowReporte= rowReporte,
                                       columnReporte = columnReporte,
                                       status=status)
        
        response = crear_dosis_repo(dosisModels)

        result = {
             "id": str(response.inserted_id),
             "name": name,
             "vacinne_id": vacinne_id,
             "age_frequency": age_frequency,
             "expires_in_days":expires_in_days,
             "status": True
        }
        return result
    else:
        return "Invalid payload", 400


"""Obtiene las dosiss"""


def get_dosiss_list_service(limite, desde, query):
    limite = int(limite)
    desde = int(desde)
    
    data = get_dosis_repoLst(limite, desde, query)
    total = get_dosis_counts_repo(query)
    new_data = []  # Initialize an empty list for the modified objects 
    for d in data:
        vaccine_id = d['vacinne_id']
        data_vac = get_vaccine_repo(vaccine_id)
        d['vaccine'] = data_vac
        new_data.append(d)  # Append the modified object to the new_data list

    result = json_util.dumps(new_data)
    diccionario = {
        'total': total,
        'limite': limite,
        'desde': desde,
        'dosiss': json.loads(result)
    }

    return Response(json_util.dumps(diccionario), mimetype="application/json")


    return jsonify(diccionario)

"""Obtener una dosis"""


def get_dosis_service(id):
    dosis = get_dosis_repo(id)
    if dosis is None:
        return {
            "error": True,
            "resp": False,
            "vaccine":None,
            "TypeError": 'dosisIdNotExist',
            "statusCode": "dosisIdNotExist",
            "ValueError": "dosisIdNotExist",
            "message": "No hay dosis para el id {}".format(id)
        }
    else:
        return Response(json_util.dumps(get_dosis_service_without_application_json(id)), mimetype="application/json")


def get_dosis_service_without_application_json(dosisId):
    #Obtengo la dosis con el id
    data = get_dosis_repo(dosisId)
    result = json_util.dumps(data)
    # Obtengo la dosis para agregarle mas datos al diccionario
    parsed_data = json.loads(result)
   

    #La parse_data es la dosis y de hay obtengo la vacuna
    vaccine_id = parsed_data['vacinne_id']
    #Obtengo todas las dosis de la vacuna
    dosis_ids= get_dosis_service_ByVaccine(vaccine_id)


    vaccine = get_vaccine_repo(vaccine_id)
    resultvac = json_util.dumps(vaccine)
    dosis_ids_vac = json_util.dumps(dosis_ids)
    parsed_data_vac = json.loads(resultvac)
    # Agregar la variable vaccine al diccionario de dosis que se obtuve en parse_data al principio
    parsed_data['vaccine'] = parsed_data_vac
    del parsed_data['vacinne_id']  # Eliminar el campo dosis_id del resultado

 
    return parsed_data


def get_dosis_service_ByVaccine(vaccine_id):
    data = get_dosis_ByVaccine(vaccine_id)
    result = json_util.dumps(data)
    # Analizar la cadena JSON
    parsed_data = json.loads(result)
    return parsed_data



"""Actualizacion de dosis"""


def update_dosis_service(id, data):
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
        response = update_dosis_repo(id, data)
        if response.modified_count >= 0:
            return {
                "error":False,
                "resp":True,
                "TypeError": "",
                "statusCode": "uptdateSuccess",
                "ValueError": "" ,
                "message": "La dosis fue actualizada correctamente" 
         }
        else:
            return {
                "error":True,
                "resp":False,
                "TypeError": id,
                "statusCode": "uptdateNotFound",
                "ValueError": "La dosis no fue encontrada" ,
                "message": "La dosis no fue encontrada" 
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
    


"""Eliminar una dosis"""


def delete_dosis_service(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        response = delete_dosis_repo(id)
        if response.deleted_count >= 1:
            return "La dosis ha sido eliminada correctamente", 200
        else:
            return "La dosis no fue encontrada", 404
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result
    
