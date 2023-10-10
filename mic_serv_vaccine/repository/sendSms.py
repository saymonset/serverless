from flask import Flask, request, jsonify,  request, Response
import json
from bson.objectid import ObjectId
from config.mongodb import mongo
from bson import ObjectId
from models.users import UserModels
from helps.utils import validar_object_id



def get_phone_in_users_repo(phone):
        return mongo.db.users.find_one({"phone": phone})

def update_status_user_repo(id, data):
    return mongo.db.users.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
      

def crear_users_repo(obj:UserModels):
    return mongo.db.users.insert_one(obj.__dict__)

 




    
