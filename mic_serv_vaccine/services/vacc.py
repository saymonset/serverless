from flask import request, Response, jsonify
from bson import json_util, ObjectId
from config.mongodb import mongo
from bson.json_util import dumps
import json


"""Registro de vacunas"""


def create_vaccine_service():
    data = request.get_json()
 
    name = data.get("name")
    description = data.get("description", None)
    disease = data.get("disease", None)
    dosis = data.get("dosis", None)
    application_age = data.get("application_age", None)
    isChildren = data.get("isChildren", False)
    if name:
        response = mongo.db.vaccines.insert_one(
            {
                "name": name,
                "description": description,
                "disease": disease,
                "dosis": dosis,
                "application_age": application_age,
                "isChildren": isChildren,
                "status": True
            }
        )
        result = {
             "id": str(response.inserted_id),
             "name": name,
             "description": description,
             "disease": disease,
             "dosis": dosis,
             "application_age": application_age,
             "isChildren": isChildren,
             "status": True
        }
        return result
    else:
        return "Invalid payload", 400


"""Obtiene las vacunas"""


def get_vaccines_service():
    limite = int(request.args.get('limite', 15))
    desde = int(request.args.get('desde', 0))
    query = {'status': True}
    data = mongo.db.vaccines.find(query).skip(desde).limit(limite)
    result = json_util.dumps(data)
    total = mongo.db.vaccines.count_documents(query)
    diccionario = {
        'total': total,
        'limite':limite,
        'desde':desde,
        'vaccines': result
    }

    return jsonify(diccionario)
    #return Response(json.dumps(diccionario), mimetype="application/json")

"""Obtener una Vacuna"""


def get_vaccine_service(id):
    data = mongo.db.vaccines.find_one({"_id": ObjectId(id)})
    result = json_util.dumps(data)
    return Response(result, mimetype="application/json")


"""Actualizacion de vacuna"""


def update_vaccine_service(id):
    data = request.get_json()
    if len(data) == 0:
        return "No hay datos para actualizar", 400

    response = mongo.db.vaccines.update_one({"_id": ObjectId(id)}, {"$set": data})

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
