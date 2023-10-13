from flask import Flask, request, jsonify,  request, Response
import json
from bson.objectid import ObjectId
from config.mongodb import mongo
from models.users import UserModels
from bson import ObjectId
from models.specialities import SpecialitiesModels
from models.doctors import  DoctorsModels
from helps.utils import validar_object_id
from passlib.hash import pbkdf2_sha256

 

def find_one_repo(query):     
    return mongo.db.users.find_one(query)

def update_status_user_repo(id, data):
    return mongo.db.users.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
      

def crear_users_repo(obj:UserModels):
    return mongo.db.users.insert_one(obj).inserted_id
    #return mongo.db.users.insert_one(obj.__dict__)

def get_phone_in_users_repo(phone):
        return mongo.db.users.find_one({"phone": phone})

def isValidBdUser(data):
    id = data.get("user_id")
    if validar_object_id(id):
        query = {'_id': ObjectId(id) }
        user = find_one_repo(query)
        if not user:
            return {"resp":False,
                    "name":"El usuarioId no existe en bd"}
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
            "resp":False,
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result
    
    return {"resp":True}
 
    #

def validateUser(ci, password):
    
    user = find_one_repo({"ci": ci}) 
    if (user and pbkdf2_sha256.verify(password, user['password'])):
       return True, user['_id']
    return False, False



    
