from flask import Flask, request, jsonify,  request, Response
import json
from bson.objectid import ObjectId
from config.mongodb import mongo
from models.dependent import DependentModels
from bson import ObjectId
from models.specialities import SpecialitiesModels
from models.doctors import  DoctorsModels
from helps.utils import validar_object_id

 
 
def checkUserDependent(query):     
    return mongo.db.users.find_one(query)

 

def crear_dependents_repo(obj:DependentModels):
    return mongo.db.dependents.insert_one(obj).inserted_id


def get_dependents_repo(limite:int, desde:int, user_id):
    query = {'status': {'$in': [True, 'True']}, 'isUser': False, 'user_id': user_id}
    return mongo.db.dependents.find(query).skip(desde).limit(limite)

def get_dependents_counts_repo(user_id):
    query = {'status': {'$in': [True, 'True']}, 'isUser': False, 'user_id': user_id}
    #query = {'status': {'$in': [True, 'True']}}
    return mongo.db.dependents.count_documents(query)