from flask import Flask, request, jsonify,  request, Response
import json
from bson.objectid import ObjectId
from config.mongodb import mongo
from bson import ObjectId
from models.ads import AdsModels
from helps.utils import validar_object_id

def create_ads_repo(obj:AdsModels):
    return mongo.db.ads.insert_one(obj).inserted_id



def get_adsList_repo(limite:int, desde:int):
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.ads.find(query).skip(desde).limit(limite)

def get_ads_counts_repo():
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.ads.count_documents(query)

def get_adsById_repo(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.ads.find_one({"_id": ObjectId(id)})
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
        return mongo.db.ads.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def delete_ads_repo(id):
     return mongo.db.ads.delete_one({"_id": ObjectId(id)})

def find_one_applyVaccine_repo(query):     
    return mongo.db.ads.find_one(query)

def find_one_repo(query):     
    return mongo.db.ads.find_one(query)

def isValidBdAds(title):
    query = {'title': title }
    titles = find_one_repo(query)
    if titles:
        return {"resp":False,
                "name":"El nombre ya existe en bd"}
    
    return {"resp":True}


def isValidBdAdsUpdate(id, data):
    title = data.get("title")
    query = {'title': title, '_id': {'$ne': ObjectId(id)}}
    objs = find_one_repo(query)
    if objs:
        return {"resp":False,
                "name":"Ads exist en bd"}
    
    return {"resp":True}
    #




    
