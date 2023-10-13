from flask import Flask, request, jsonify,  request, Response
import json
from bson.objectid import ObjectId
from config.mongodb import mongo
from bson import ObjectId
from models.relationships import RelationshipsModels
from helps.utils import validar_object_id

def crear_relationships_repo(obj:RelationshipsModels):
    return mongo.db.relationships.insert_one(obj.__dict__)

def get_relationships_page_repo(limite:int, desde:int):
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.relationships.find(query).skip(desde).limit(limite)

def get_relationships_counts_repo():
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.relationships.count_documents(query)

def get_relationships_repo(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.relationships.find_one({"_id": ObjectId(id)})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def update_relationships_repo(id, data):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.relationships.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def delete_relationships_repo(id):
     return mongo.db.relationships.delete_one({"_id": ObjectId(id)})

def find_one_repo(query):     
  
    return mongo.db.relationships.find_one(query)


def isValidBdRelationships(name):
    query = {'name': name }
    campo = find_one_repo(query)
    if campo:
        return {"resp":False,
                "name":"El nombre ya existe en bd"}
    
    return {"resp":True}


def isValidBdRelationshipsUpdate(id, data):
    name = data.get("name")
    query = {'name': name, '_id': {'$ne': ObjectId(id)}}
    objs = find_one_repo(query)
    if objs:
        return {"resp":False,
                "name":"El nombre ya existe en bd"}
    
    return {"resp":True}
    




    
