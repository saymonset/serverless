from flask import Flask, request, jsonify,  request, Response
import json
from bson.objectid import ObjectId
from config.mongodb import mongo
from bson import ObjectId
from models.specialities import SpecialitiesModels
from helps.utils import validar_object_id

def create_specialities_repo(specialitiesModels:SpecialitiesModels):
    return mongo.db.specialities.insert_one(specialitiesModels.__dict__)

def get_specialities_list_repo(limite:int, desde:int):
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.specialities.find(query).skip(desde).limit(limite)

def get_specialities_counts_repo():
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.specialities.count_documents(query)

def get_specialities_repo(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.specialities.find_one({"_id": ObjectId(id)})
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
        return mongo.db.specialities.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def delete_speciality_repo(id):
     return mongo.db.specialities.delete_one({"_id": ObjectId(id)})

def find_one_applyVaccine_repo(query):     
    return mongo.db.specialities.find_one(query)

def find_one_repo(query):     
    return mongo.db.specialities.find_one(query)

def isValidBdSpeciality(speciality):
    query = {'speciality': speciality }
    specialities = find_one_repo(query)
    if specialities:
        return {"resp":False,
                "name":"El nombre ya existe en bd"}
    
    return {"resp":True}


def isValidBdSpecialityUpdate(id, data):
    speciality = data.get("speciality")
    query = {'speciality': speciality, '_id': {'$ne': ObjectId(id)}}
    specialities = find_one_repo(query)
    if specialities:
        return {"resp":False,
                "name":"El speciality ya existe en bd"}
    
    return {"resp":True}
    #




    
