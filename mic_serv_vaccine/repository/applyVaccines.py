from flask import Flask, request, jsonify,  request, Response
import json
from bson.objectid import ObjectId
from config.mongodb import mongo
from bson import ObjectId
from models.applyVaccines import ApplyVaccineModels
from helps.utils import validar_object_id

def crear_applyVaccine_repo(applyVaccineModels:ApplyVaccineModels):
    return mongo.db.apply_vaccines.insert_one(applyVaccineModels.__dict__)

def get_applyVaccine_list_repo(limite:int, desde:int):
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.apply_vaccines.find(query).skip(desde).limit(limite)

def get_applyVaccine_counts_repo():
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.apply_vaccines.count_documents(query)

def get_applyVaccine_repo(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.apply_vaccines.find_one({"_id": ObjectId(id)})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def update_applyVaccine_repo(id, data):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.apply_vaccines.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def delete_apply_vaccine_repo(id):
     return mongo.db.apply_vaccines.delete_one({"_id": ObjectId(id)})

def find_one_applyVaccine_repo(query):     
    return mongo.db.apply_vaccines.find_one(query)

def get_dependent_applied_vaccines(dependent_id: int):
    query = {'family_id': dependent_id}
    return mongo.db.apply_vaccines.find(query).sort("date")


# def isValidBdVaccine():
#     data = request.get_json()
#     name = data.get("name")
#     query = {'name': name }
#     vaccines = find_one_repo(query)
#     if vaccines:
#         return {"resp":False,
#                 "name":"El nombre ya existe en bd"}
    
#     return {"resp":True}


# def isValidBdVaccineUpdate(id):
#     data = request.get_json()
#     name = data.get("name")
#     query = {'name': name, '_id': {'$ne': ObjectId(id)}}
#     vaccines = find_one_repo(query)
#     if vaccines:
#         return {"resp":False,
#                 "name":"El nombre ya existe en bd"}
    
#     return {"resp":True}
    




    
