from flask import request, Response, jsonify
from bson import json_util, ObjectId
from config.mongodb import mongo
from bson.json_util import dumps
import json
from models.applyVaccines import  ApplyVaccineModels
from services.vacc import  get_vaccine_service 


"""Registro de vacunas"""


def create_apply_vaccine_service():
    data = request.get_json()
    lote = data.get("lote", None)
    vacinne_id = data.get("vacinne_id", None)
    status = data.get("status", True)
    # Crea un nuevo documento de usuario
    applyVaccineModels = ApplyVaccineModels(lote=lote, vacinne_id=vacinne_id, status=status)
  
    mongo.db.apply_vaccines.insert_one(applyVaccineModels.__dict__)

    response_data = {
        'message': 'Documento insertado correctamente'
    }
    response = Response(json.dumps(response_data), status=200, mimetype='application/json')
    return response

 


"""Obtiene las vacunas"""


def get_applyVacciness_service():
    limite = int(request.args.get('limite', 15))
    desde = int(request.args.get('desde', 0))
    query = {'status': {'$in': [True, 'True']}}
    data = mongo.db.apply_vaccines.find(query).skip(desde).limit(limite)
   # data = mongo.db.apply_vaccines.find()
  
    result = json_util.dumps(data)
    total = mongo.db.apply_vaccines.count_documents(query)
    diccionario = {
        'total': total,
        'limite':limite,
        'desde':desde,
        'apply_vaccines': json.loads(result)
    }
    return jsonify((diccionario))

"""Obtener una Vacuna"""


def get_apply__vaccine_service(id):
    data = mongo.db.apply_vaccines.find_one({"_id": ObjectId(id)})
    vaccine = None
    if data is not None and data['vacinne_id'] is not None:
       vaccine = mongo.db.vaccines.find_one({"_id": ObjectId(data['vacinne_id'])})

    response_data = {
            'result': data,
            'vaccine':vaccine
    }
    response = Response(json.dumps(json.loads(json_util.dumps(response_data))), status=200, mimetype='application/json')
    return response


"""Actualizacion de vacuna"""


def update_vaccine_service(id):
    data = request.get_json()
    if len(data) == 0:
        return "No hay datos para actualizar", 400

   
    response = mongo.db.vaccines.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
    if response.modified_count >= 1:
        return "La vacuna ah sido actualizada correctamente", 200
    else:
        return "La vacuna no fue encontrada", 404


"""Eliminar una vacuna"""


def delete_vaccine_service(id):
    response = mongo.db.vaccines.delete_one({"_id": ObjectId(id)})
    if response.deleted_count >= 1:
        return "La vacuna ha sido eliminada correctamente", 200
    else:
        return "La vacuna no fue encontrada", 404
