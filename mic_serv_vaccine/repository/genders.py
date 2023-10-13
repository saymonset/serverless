from flask import Flask, request, jsonify,  request, Response
import json
from bson.objectid import ObjectId
from config.mongodb import mongo
from bson import ObjectId
from models.genders import GenderModels
from helps.utils import validar_object_id

def crear_genders_repo(obj:GenderModels):
    return mongo.db.genders.insert_one(obj.__dict__)

def get_genders_repo(limite:int, desde:int):
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.genders.find(query).skip(desde).limit(limite)

def get_genders_counts_repo():
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.genders.count_documents(query)

def get_gender_repo(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.genders.find_one({"_id": ObjectId(id)})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def update_genders_repo(id, data):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.genders.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def delete_genders_repo(id):
     return mongo.db.genders.delete_one({"_id": ObjectId(id)})

def find_one_repo(query):     
  
    return mongo.db.genders.find_one(query)


def isValidBdgenders(name):
    query = {'name': name }
    campo = find_one_repo(query)
    if campo:
        return {"resp":False,
                "name":"El nombre ya existe en bd"}
    
    return {"resp":True}


def isValidBdgendersUpdate(id):
    data = request.get_json()
    name = data.get("name")
    query = {'name': name, '_id': {'$ne': ObjectId(id)}}
    genders = find_one_repo(query)
    if genders:
        return {"resp":False,
                "name":"El nombre ya existe en bd"}
    
    return {"resp":True}
    




    
