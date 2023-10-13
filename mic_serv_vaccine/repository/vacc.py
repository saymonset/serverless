from flask import Flask, request, jsonify,  request, Response
import json
from bson.objectid import ObjectId
from config.mongodb import mongo
from bson import ObjectId
from models.vaccine import VaccineModels
from helps.utils import validar_object_id

def crear_vacuna_repo(vacuna:VaccineModels):
    return mongo.db.vaccines.insert_one(vacuna.__dict__)

def get_vaccines_repo(limite:int, desde:int):
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.vaccines.find(query).skip(desde).limit(limite)

def get_vaccines_all(isChildren: bool):
    query = {'status': {'$in': [True, 'True']}, 'isChildren': isChildren}
    return mongo.db.vaccines.find(query)

def get_vaccines_counts_repo():
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.vaccines.count_documents(query)

def get_vaccine_repo(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.vaccines.find_one({"_id": ObjectId(id)})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def update_vaccine_repo(id, data):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.vaccines.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def delete_vaccine_repo(id):
     return mongo.db.vaccines.delete_one({"_id": ObjectId(id)})

def find_one_repo(query):     
  
    return mongo.db.vaccines.find_one(query)


def isValidBdVaccine(data):
    name = data.get("name")
    query = {'name': name }
    vaccines = find_one_repo(query)
    if vaccines:
        return {"resp":False,
                "name":"El nombre ya existe en bd"}
    
    return {"resp":True}


def isValidBdVaccineUpdate(id, data):
    name = data.get("name")
    query = {'name': name, '_id': {'$ne': ObjectId(id)}}
    vaccines = find_one_repo(query)
    if vaccines:
        return {"resp":False,
                "name":"El nombre ya existe en bd"}
    
    return {"resp":True}
    




    
