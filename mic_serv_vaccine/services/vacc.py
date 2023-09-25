from flask import request, Response
from bson import json_util, ObjectId
from config.mongodb import mongo


"""Registro de vacunas"""


def create_vaccine_service():
    data = request.get_json()
 
    name = data.get("name")
    description = data.get("description", None)
    disease = data.get("disease", None)
    dosis = data.get("dosis", None)
    application_age = data.get("application_age", None)
    isChildren = data.get("isChildren", None)
    if name:
        response = mongo.db.vaccines.insert_one(
            {
                "name": name,
                "description": description,
                "disease": disease,
                "dosis": dosis,
                "application_age": application_age,
                "isChildren": isChildren,
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
        }
        return result
    else:
        return "Invalid payload", 400


"""Obtiene las vacunas"""


def get_vaccines_service():
    data = mongo.db.vaccines.find()
    result = json_util.dumps(data)
    return Response(result, mimetype="application/json")


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
