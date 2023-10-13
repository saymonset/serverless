from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json, os, jwt
from passlib.hash import pbkdf2_sha256
from config.mongodb  import   mongo
from repository.user import    validateUser
from helps.utils import validar_object_id
from datetime import datetime, timedelta




"""Login de objetos"""

def login(udata):
    secret = os.environ.get("JWT_SECRET")
    isVal, id = validateUser(udata['ci'], udata['password'])
    if (isVal):
        exp_time = datetime.now() + timedelta(minutes=100)
        token = jwt.encode({"_id": str(id), 'exp': exp_time}, secret, algorithm="HS256")
        body = json.dumps( { 'message' : f"user validated successfully", "token": token}) 
        response = {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            },
            'body': body
        }
        return response
    response = {
        'statusCode': 401,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        'body': json.dumps( { 'message' : f"Unauthorized"})
    }
    return response