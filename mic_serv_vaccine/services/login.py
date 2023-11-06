from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json, os, jwt
from passlib.hash import pbkdf2_sha256
from config.mongodb  import   mongo
from repository.user import    validateUser, validateUserByEmail
from repository.dependent import    checkUserDependent
from helps.utils import validar_object_id
from datetime import datetime, timedelta
from helps.token import createToken




"""Login de objetos"""

def login(udata):
    secret = os.environ.get("JWT_SECRET")
    isVal, id, user = validateUser(udata['ci'], udata['password'])
    if (isVal):
        token = createToken(id)
        dependent_is_user = checkUserDependent({'isUser': True, "user_id": id })
        user = json_util.dumps(user)
        dependent_is_user = json_util.dumps(dependent_is_user)
        response = {
            'statusCode': 200,
            'token':token,
            'usuario':  json.loads(user),
            'more': json.loads(dependent_is_user),
            "resp":True,
        }
        return response
    response = {
        'statusCode': 401,
         "resp":False,
         "message":"Unauthorized"
    }
    return response

"""Login de objetos"""

def loginByMail(udata):
    secret = os.environ.get("JWT_SECRET")
    isVal, id, user = validateUserByEmail(udata['email'], udata['password'])
    if (isVal):
        exp_time = datetime.now() + timedelta(minutes=100)
        token = jwt.encode({"_id": str(id), 'exp': exp_time}, secret, algorithm="HS256")
        dependent_is_user = checkUserDependent({'isUser': True, "user_id": id })
        user = json_util.dumps(user)
        dependent_is_user = json_util.dumps(dependent_is_user)
        response = {
            'statusCode': 200,
            'token':token,
            'usuario':  json.loads(user),
            'more': json.loads(dependent_is_user),
            "resp":True,
        }
        return response
    response = {
        'statusCode': 401,
         "resp":False,
         "message":"Unauthorized"
    }
    return response