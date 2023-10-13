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

 

def find_one_blacklist_repo(query):     
    return mongo.db.blacklist.find_one(query)

def update_status_blacklist_repo(id, data):
    return mongo.db.blacklist.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": data})
      

def crear_blacklists_repo(obj):
    return mongo.db.blacklist.insert_one(obj).inserted_id
    #return mongo.db.users.insert_one(obj.__dict__)

def get_phone_in_blacklists_repo(phone):
        return mongo.db.blacklist.find_one({"phone": phone})
 