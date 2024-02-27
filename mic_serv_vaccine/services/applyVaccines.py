from datetime import datetime
from flask import request, Response, jsonify
from bson import json_util, ObjectId
from config.mongodb import mongo
from bson.json_util import dumps
import json
from models.applyVaccines import  ApplyVaccineModels
from services.vacc import  get_vaccine_service 
from services.dosis import  get_dosis_service_without_application_json
from repository.applyVaccines import update_applyVaccine_repo, crear_applyVaccine_repo, get_applyVaccine_repo,get_applyVaccine_counts_repo
from repository.applyVaccines import delete_apply_vaccine_repo, get_apply__vaccineOfDosisAndDependent_repo, find_one_applyVaccine_repo, get_applyVaccine_list_repo
from repository.vacc import  get_vaccine_repo
from services.dependent import  get_dependentsbyId_servicWithOutJson
from helps.utils import validar_object_id
from datetime import date
from datetime import datetime
"""Registro de vacunas"""
    
def create_apply_vaccine_service(data):
    dosis_id = data.get("dosis_id")
    dependent_id = data.get("dependent_id")
    lote = data.get("lote")
    image = data.get("image")
    vaccination_date = data.get("vaccination_date")
    #datetime.strptime(data.get("date_apply"), "%Y-%m-%d")
    # Obtener la fecha actual
    fecha_actual = date.today()

    # Convertir la fecha actual a un objeto datetime
    fecha_actual_datetime = datetime.combine(fecha_actual, datetime.min.time())
    status = data.get("status", True)
    if dosis_id:
        # Crea un nuevo documento de usuario
        applyVaccineModels = ApplyVaccineModels(dosis_id=dosis_id, 
                                                dependent_id=dependent_id, 
                                                lote=lote, 
                                                image=image, 
                                                vaccination_date=vaccination_date, 
                                                status=status)
        response = crear_applyVaccine_repo(applyVaccineModels)
 
        result = {
               # "id": str(response.inserted_id),
                "dosis_id": dosis_id,
                "dependent_id":dependent_id, 
                "lote":lote, 
                "image":image, 
                "vaccination_date":vaccination_date, 
                "status": status,
                "statusCode": 201,
                 "resp":True,
            }
        return json.loads(json_util.dumps(result))
    else:
        result = {
                "statusCode": 400,
                 "resp":False,
            }
        return result

 


"""Obtiene las vacunas"""


def get_applyVaccinesList_service(limite, desde, query):
     

    result = get_applyVaccinesListWithoutJSOn_service(limite, desde, query)
    
    #result = json_util.dumps(data)
    total = get_applyVaccine_counts_repo(query)
    diccionario = {
        'total': total,
        'limite':limite,
        'desde':desde,
        'apply_vaccines': json.loads(result),
        "statusCode": 201,
         "resp":True,
    }
    return jsonify((diccionario))

#Sin llevarlo a JSON
def get_applyVaccinesListWithoutJSOn_service(limite, desde, query):
    limite = int(limite)
    desde = int(desde)
    #El query es el dependent
    data = get_applyVaccine_list_repo(limite, desde, query)
   
   #Agarramos 
    allDosis = None  # Inicializar la variable fuera del bucle
    new_data = []  # Initialize an empty list for the modified objects 
    for d in data:
        #Recuperamos la data de la dosis
        dosis_id = d['dosis_id']
       
         #No se aplica el formato json 
        data_dosis = get_dosis_service_without_application_json(dosis_id)
        d['dosis'] = data_dosis;

        #Recuperamos data del dependent
        dependent_id = d['dependent_id']
        #No se aplica el formato json 
        data_dependent = get_dependentsbyId_servicWithOutJson(dependent_id);
        d['dependent'] = data_dependent
        del d['dependent_id'] # Eliminar el campo dosis_id del resultado    
        del d['dosis_id'] # Eliminar el campo dosis_id del resultado    
        new_data.append(d)  # Append the modified object to the new_data list
    

    result = json_util.dumps(new_data)
    
    return result    

 

"""Obtener una Vacuna"""
def get_apply__vaccine_service(id):
    #Obtenemos el diccionario de applyVaccine en data
    data = get_applyVaccine_repo(id)
    dosis = None
    if data is not None and data['dosis_id'] is not None:
        #Del diccionario con key dosis_id, obteneos una data de dosis mas completo
       dosis = get_dosis_service_without_application_json(data['dosis_id'])
       data['dosis'] = dosis;
       del data['dosis_id']  # Eliminar el campo dosis_id del resultado

    response_data = {
            'result': data,
            "statusCode": 201,
            "resp":True,
    }
    response = Response(json.dumps(json.loads(json_util.dumps(response_data))), status=200, mimetype='application/json')
    return response

"""Obtener si aplico la dosis a este dependent"""
def get_apply_vaccineOfDosisAndDependent_service(dosisId, dependentId):
    #Obtenemos el diccionario de applyVaccine en data
    data = get_apply__vaccineOfDosisAndDependent_repo(dosisId, dependentId)
    if data is None: 
       result = {
                "message":"La dosis y dependent no a sido aplicada", 
                "statusCode": 200,
                 "resp":False,
            }
    else:
       result = {
                "message":"La dosis y dependent esta aplicada", 
                "statusCode": 200,
                 "resp":True,
            }         
    return result


"""Actualizacion de vacuna"""


def update_apply_vaccine_service(id, data):
    if len(data) == 0:
        return "No hay datos para actualizar", 400

    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        response = update_applyVaccine_repo(id, data)
        if response.modified_count >= 1:
            result = {
                "message":"La vaccine ah sido actualizada correctamente", 
                "statusCode": 200,
                 "resp":True,
            }
            return result
        else:
            result = {
                "message":"La apply vaccine no fue encontrada", 
                "statusCode": 404,
                 "resp":False,
            }
            return result
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
                "TypeError": id,
                "ValueError": "La cadena no es un ObjectId válido" ,
                "message":"La cadena no es un ObjectId válido", 
                "statusCode": 404,
                 "resp":False,
            }
        return result    

 


"""Eliminar una vacuna"""


def delete_applyVaccines_service(id):
    data = get_applyVaccine_repo(id)
    if data is not None:
        response =delete_apply_vaccine_repo(id)
        if response.deleted_count >= 1:
            return "La apply_vaccine ha sido eliminada correctamente", 200
        else:
            result = {
                "TypeError": id,
                "ValueError": "La apply_vaccine no fue encontrada",
                "message":"La apply_vaccine no fue encontrada", 
                "statusCode": 404,
                 "resp":False,
            }
            return result
    else:
         result = {
                "TypeError": id,
                "ValueError": "No existe registro para el id:"+id,
                "message":"No existe registro para el id:"+id, 
                "statusCode": 400,
                 "resp":False,
            }
         return result
