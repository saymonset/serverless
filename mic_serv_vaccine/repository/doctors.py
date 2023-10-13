from flask import Flask, request, jsonify,  request, Response
import json
from bson.objectid import ObjectId
from config.mongodb import mongo
from bson import ObjectId
from models.specialities import SpecialitiesModels
from models.doctors import  DoctorsModels
from helps.utils import validar_object_id

def create_doctors_repo(doctorsModels:DoctorsModels):
    return mongo.db.doctors.insert_one(doctorsModels.__dict__)

def get_doctors_list_repo(limite:int, desde:int):
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.doctors.find(query).skip(desde).limit(limite)

def get_doctors_counts_repo():
    query = {'status': {'$in': [True, 'True']}}
    return mongo.db.doctors.count_documents(query)

def get_doctor_repo(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.doctors.find_one({"_id": ObjectId(id)})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def update_doctors_repo(id, data):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.doctors.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

def delete_doctor_repo(id):
    
         return mongo.db.doctors.delete_one({"_id": ObjectId(id)})
   
    

def find_one_applyVaccine_repo(query):     
    return mongo.db.specialities.find_one(query)

def find_one_repo(query):     
    return mongo.db.doctors.find_one(query)

def isValidBdDoctors(data):
    user_id = data.get("user_id")
    query = {'user_id': user_id }
    doctors = find_one_repo(query)
    if doctors:
        return {"resp":False,
                "name":"El doctor ya existe en bd"}
    
    return {"resp":True}


def isValidBdDoctorUpdate(id, data):
     if not validar_object_id(id):
         # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result
       
     user_id = data["user_id"]
    
     if not validar_object_id(user_id):
         # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "El usuario no es valido" 
        }
        return result
    
    
     return {"resp":True}




    
