from flask import Flask, request, jsonify,  request, Response
import json
from bson.objectid import ObjectId
from config.mongodb import mongo
from bson import json_util, ObjectId
from models.dosis import DosisModels
from helps.utils import validar_object_id, get_caracteres_especiales

def crear_dosis_repo(dosis:DosisModels):
    return mongo.db.dosis.insert_one(dosis.__dict__)

def get_dosis_repoLst(limite:int, desde:int, query:str):
    contador = get_caracteres_especiales(query)

    if query is not None and (not query.strip() or len(query) == contador):
        filter_query = {
            'status': {'$in': [True, 'True']}
        }
    else:
        filter_query = {
            "$or": [
                {"name": {"$regex": query, "$options": "i"}},
                {"age_frequency": {"$regex": query, "$options": "i"}}
            ]
        }
    resp =  mongo.db.dosis.find(filter_query).skip(desde).limit(limite)
    return resp



def get_dosis_counts_repo(query:str):
    contador = get_caracteres_especiales(query)

    if query is not None and (not query.strip() or len(query) == contador):
        filter_query = {
            'status': {'$in': [True, 'True']}
        }
    else:
        filter_query = {
            "$or": [
                {"name": {"$regex": query, "$options": "i"}},
                {"age_frequency": {"$regex": query, "$options": "i"}}
            ]
        }
    return mongo.db.dosis.count_documents(filter_query)
    
def get_dosis_all():
    return mongo.db.dosis.find()

def get_dosis_repo(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.dosis.find_one({"_id": ObjectId(id)})
    else:
        # Maneja el error o muestra un mensaje de error
        
        result  = {
                "error":False,
                "resp":False,
                "TypeError": id,
                "statusCode": "badCadena",
                "ValueError": "La cadena no es un ObjectId válido" ,
                "message": "La cadena no es un ObjectId válido" 
         }
        return result
 

def update_dosis_repo(id, data):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.dosis.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def delete_dosis_repo(id):
     return mongo.db.dosis.delete_one({"_id": ObjectId(id)})

def find_one_repo(query):     
  
    return mongo.db.dosis.find_one(query)


def isValidBddosis(data):
    name = data.get("name")
    vacinne_id = data.get("vacinne_id")
    query = {'name': name, 'vacinne_id': vacinne_id}  # Add 'vaccine_id' to the query
    print(query)
    dosis = find_one_repo(query)
    if dosis:
        
        return {"resp":False,
                "name":"El nombre ya existe en bd"}
    
    return {"resp":True}


def isValidBddosisUpdate(id, data):
    name = data.get("name")
    query = {'name': name, '_id': {'$ne': ObjectId(id)}}
    dosis = find_one_repo(query)
    if dosis:
        return {"resp":False,
                "name":"El nombre ya existe en bd"}
    
    return {"resp":True}
    




    
