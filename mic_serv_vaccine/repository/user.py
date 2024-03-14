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
from repository.dependent import    checkUserDependent
 


def validateUserByEmail(email, password):
 
    userDependent = checkUserDependent({"email": email, "isUser": True}) 
    if userDependent:
        user = get_user_repo(userDependent['user_id'])
        if (user and pbkdf2_sha256.verify(password, user['password'])):
            return True, user['_id'], user
        return False, False, user
    else:
        return False, False, None
def validateUser(ci, password):
    user = find_one_repo({"ci": ci}) 
    if (user and pbkdf2_sha256.verify(password, user['password'])):
       return True, user['_id'], user
    return False, False, user

def find_one_repo(query):     
    return mongo.db.users.find_one(query)

def update_status_user_repo(id, data):
    return mongo.db.users.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})


def update_user_repo(id, data):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.users.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

      
def get_user_repo(id):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.users.find_one({"_id": ObjectId(id)})
    else:
            # Maneja el error o muestra un mensaje de error
        result  = {
                "error":False,
                "resp":False,
                "TypeError": id,
                "ValueError": "La cadena no es un ObjectId válido" 
         }
        return result
def crear_users_repo(obj:UserModels):
    return mongo.db.users.insert_one(obj).inserted_id
    #return mongo.db.users.insert_one(obj.__dict__)

def delete_user_repo(id):
         return mongo.db.users.delete_one({"_id": ObjectId(id)})

def get_phone_in_users_repo(phone):
        #Buscamos si en la tabla user que es la principal existe el usuario
        data = mongo.db.users.find_one({"phone": phone})
        if data is not None:
            # Chequeamos en la tabla dependent si sta ya registrado como isUser = true
            resp = checkUserDependent({'user_id': data['_id'], 'isUser': True})
            #Si ya existe el usuario como depndent tambien y es true su isUser entoncves ya esta registrado
            if resp is not None:
                #Respondemos  que existe el usuario
                return data
            else:
                #No existe el usuario en dependent, entoces hay que eliminarlo del pincipal USER para que se vuellva  a crear nuevamente
                userId = data['_id'];
                delete_user_repo(userId);
                return None    
        else:
            #No existe el suuario y se crea 
            return None
            

       

def get_user_repo_list(limite:int, desde:int):
    query = {'status': {'$in': [True, 'True']}}

    return mongo.db.users.find({}).skip(desde).limit(limite)
    #return cursor

def get_user_counts_repo():
    query = {'status': {'$in': [True, 'True']}}
    #query = {'status': {'$in': [True, 'True']}}
    return mongo.db.users.count_documents({})

def isValidBdUser(data):
    id = data.get("user_id")
    if validar_object_id(id):
        query = {'_id': ObjectId(id) }
        user = find_one_repo(query)
        if not user:
            return {"resp":False,
                    "error": "El usuarioId no existe en bd",
                    'statusCode':'badUserNotExist',
                    "name":"El usuarioId no existe en bd"}
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
            "resp":False,
             "TypeError": id,
             "error": "La cadena no es un ObjectId válido",
             'statusCode':'badCadenaNotValid',
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result
    
    return {"resp":True}

def isValidBdEmail(data):
    email = data.get("email")
    userDependent = checkUserDependent({"email": email}) 
    if userDependent:
        return {    "resp":False,
                    "error": "El email existe en bd",
                    'statusCode':'badExistEmailInBD',
                    "email":"El email existe en bd"}
    return {"resp":True}
 
 # return {"error": "El email existe en bd", 'resp':False, 'statusCode':'badExistEmail'}    
    #





    
