from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json
from passlib.hash import pbkdf2_sha256
from config.mongodb  import   mongo
from repository.user import   update_status_user_repo
from repository.dependent import   checkUserDependent, crear_dependents_repo
from helps.utils import validar_object_id




"""Registro de objetos"""


def create_user_service(user_data, usuario):
    print(user_data)
    print(usuario)
    user_id = usuario['_id']
    ci = user_data['ci']
    city = user_data['city']
    state = user_data['state']
    password = pbkdf2_sha256.hash(user_data['password'])
    del user_data['password']
    del user_data['ci']
    del user_data['city']
    del user_data['state']
    user_data['isUser'] = True
    user_data['user_id'] = user_id
    if checkUserDependent({'user_id': user_id, 'isUser': True}) is None:
      crear_dependents_repo(user_data)
      update_status_user_repo(user_id, {'password': password, 'ci': ci, 'city': city, 'state': state} )
      body = json.dumps( { 'message' : f"user with ID {user_id} was created successfully"}) 
    else:
      body = json.dumps( { 'message' : f"User already exist"}) 
    response = {
        'statusCode': 201,
        'headers': {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': True,
        },
        'body': body
    }
    return response

 
