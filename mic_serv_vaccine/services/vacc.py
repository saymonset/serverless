from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json

from config.mongodb  import   mongo
from models.vaccine  import   VaccineModels
from repository.vacc import   crear_vacuna_repo, get_vaccines_repo, get_vaccines_counts_repo
from repository.vacc import   get_vaccine_repo, update_vaccine_repo, delete_vaccine_repo
from repository.dosis import    get_dosis_repo
from services.dosis  import   get_dosis_service_ByVaccine, get_dosis_service_without_application_json
from services.dependent import  get_dependentsbyId_servicWithOutJson
from repository.applyVaccines import get_apply__vaccineOfDosisAndDependent_repo
from helps.utils import validar_object_id




"""Registro de vacunas"""


def create_vaccine_service(data):
    name = data.get("name")
    description = data.get("description", None)
    disease_prevents = data.get("disease_prevents", None)
    application_age = data.get("application_age", None)
    isChildren = data.get("isChildren", False)
    status = data.get("status", False)
    if name:
         # Crea un nuevo documento de usuario
        vaccineModels = VaccineModels(name=name, description=description, 
                                       disease_prevents=disease_prevents, application_age=application_age, 
                                       isChildren=isChildren, status=status)
        
        response = crear_vacuna_repo(vaccineModels)

        result = {
             "id": str(response.inserted_id),
             "name": name,
             "description": description,
             "disease_prevents": disease_prevents,
             "application_age": application_age,
             "isChildren": isChildren,
             "status": True
        }
        return result
    else:
        return "Invalid payload", 400


"""Obtiene las vacunas"""


def get_vaccines_list_service(limite, desde, query):
    limite = int(limite)
    desde = int(desde)
    
    data = get_vaccines_repo(limite, desde,  query)
    total = get_vaccines_counts_repo(query)

    result = json_util.dumps(data)
    diccionario = {
        'total': total,
        'limite':limite,
        'desde':desde,
        'vaccines': json.loads(result)
    }

    return jsonify(diccionario)

"""Obtener una Vacuna"""


def get_vaccine_service(id):
    return Response(get_vaccine_serviceWithout_Application_Json(id), mimetype="application/json")

def get_vaccine_serviceWithout_Application_Json(id):
    #Obtenemos el diccionario  de la vacuna por su id de vacuna
    data = get_vaccine_repo(id)
    #Obtenemos las dosis de esa vacuna
    dosis_ids= get_dosis_service_ByVaccine(id)
    #En el diionario le sumamos los dosis_ids
    data['dosis_ids'] = dosis_ids;
    # Obtenemos  la data como run nuevo resul para enviar
    result = json_util.dumps(data)
    return result


def getDosisAppliedToDependent(dosis_ids, dependentId):
    new_dosis_ids = []
    for d in dosis_ids:
        dosisVacc = d['_id']['$oid']
        data = get_apply__vaccineOfDosisAndDependent_repo(dosisVacc, dependentId)
        if data is None:
            d['isApplied'] = False
            d['lote'] = None
            d['image'] = None
            d['vaccination_date'] = None
        else:
            d['isApplied'] = True
            d['lote'] = data['lote']
            d['image'] = data['image']
            d['vaccination_date'] = data['vaccination_date']
        d['dependentId'] = dependentId
        d['dosisId'] = dosisVacc
        new_dosis_ids.append(d)
    return new_dosis_ids    

 #Obtenemos todas las dosis de la vacuna y vemos cuales dosis a sido aplicada a este familiar o dependent
def vaccfindfromvaccidanddependetid_srv(vaccineId, dependentId):
    vaccine = get_vaccine_repo(vaccineId)
    dosis_ids = get_dosis_service_ByVaccine(vaccineId)
    primera_dosis = None;
    if dosis_ids is not None and  len(dosis_ids) > 0:
        primera_dosis = dosis_ids[0]
        dosis_id = primera_dosis['_id']['$oid']
        print(dosis_id)
        return vaccdosisdependet_srv(dosis_id, dependentId);
    else:
       #Obtenemos el dependiente
        data_dependent = get_dependentsbyId_servicWithOutJson(dependentId)
        vacc_vaccine_apply = []
        vacc_vaccine_apply.append(data_dependent)
        vacc_vaccine_apply.append({"vaccine": []})
        vacc_vaccine_apply.append({"dosis": []})
        response_data = {
            'vacc_apply_vaccines': vacc_vaccine_apply,
            "statusCode": 201,
            "resp": True,
        }
        response = Response(json.dumps(json.loads(json_util.dumps(response_data))), status=200, mimetype='application/json')
        return response
 #Obtenemos todas las dosis de la vacuna y vemos cuales dosis a sido aplicada a este familiar o dependent
def vaccdosisdependet_srv(dosisId, dependentId):
    #Obtenemos la vacuna de la dosis
    vaccineId = get_vacc_of_dosis(dosisId)
    vaccine = get_vaccine_repo(vaccineId)
    #Obtenemos el dependiente
    data_dependent = get_dependentsbyId_servicWithOutJson(dependentId)
    #Obtenemos tosdas las dosis de la vacuna
    dosis_ids = get_dosis_service_ByVaccine(vaccineId)
    #Chequeamods cuales  dosis tiene aplicada al dependiente y cuales no 
    appliedDosis = getDosisAppliedToDependent(dosis_ids, dependentId)
    vacc_vaccine_apply = []
    vacc_vaccine_apply.append(data_dependent)
    vacc_vaccine_apply.append({"vaccine": vaccine})
    vacc_vaccine_apply.append({"dosis": appliedDosis})
    response_data = {
        'vacc_apply_vaccines': vacc_vaccine_apply,
        "statusCode": 201,
        "resp": True,
    }
    response = Response(json.dumps(json.loads(json_util.dumps(response_data))), status=200, mimetype='application/json')
    return response


def get_vacc_of_dosis(dosis):
    #Obtengo la dosis con el id
    data = get_dosis_repo(dosis)
    result = json_util.dumps(data)
    # Obtengo la dosis para agregarle mas datos al diccionario
    parsed_data = json.loads(result)

    #La parse_data es la dosis y de hay obtengo la vacuna
    vaccine_id = parsed_data['vacinne_id']
    # #Obtengo todas las dosis de la vacuna
    # dosis_ids= get_dosis_service_ByVaccine(vaccine_id)


    # dosis_ids_vac = json_util.dumps(dosis_ids)

    return vaccine_id;   


"""Actualizacion de vacuna"""


def update_vaccine_service(id, data):
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
        response = update_vaccine_repo(id, data)
        if response.modified_count >= 0:
            return {
                "error":False,
                "resp":True,
                "TypeError": id,
                "statusCode": "uptdateSuccess",
                "ValueError": "La vacuna fue actualizada correctamente" ,
                "message": "La vacuna fue actualizada correctamente" 
         }
        else:
            return {
                "error":True,
                "resp":False,
                "TypeError": id,
                "statusCode": "uptdateNotFound",
                "ValueError": "La vacuna no fue encontrada" ,
                "message": "La vacuna no fue encontrada" 
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
    


"""Eliminar una vacuna"""


def delete_vaccine_service(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        response = delete_vaccine_repo(id)
        if response.deleted_count >= 1:
            return "La vacuna ha sido eliminada correctamente", 200
        else:
            return "La vacuna no fue encontrada", 404
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result
    
