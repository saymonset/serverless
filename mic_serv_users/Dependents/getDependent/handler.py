try:
  import unzip_requirements
except ImportError:
  pass
import json, os, jwt
from pymongo import MongoClient
from bson import ObjectId, json_util

conn = MongoClient(os.environ.get('MONGO_URI'))
secret = os.environ.get("JWT_SECRET")
db = conn.mic_serv_users

def getDependents(event, context):
    user_id = getUserIdByToken(event['headers']['Authorization'])
    dependents = db.dependents.find({'user_id': user_id, 'isUser':False})
    if dependents:
        body, code = json_util.dumps(dependents), 200
    else:
        body, code = json.dumps( { 'message' : f"User has not added dependents"}), 404
    response = {
        'statusCode': code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        'body': body
    }
    return response

def getDependent(event, context):
    user_id = getUserIdByToken(event['headers']['Authorization'])
    dependent = db.dependents.find_one({"_id": ObjectId(event.pathParameters.id), 'isUser': False, 'user_id': user_id})
    if dependent:
        body, code = json_util.dumps(dependent), 200
    else:
        body, code = json.dumps( { 'message' : f"Dependent not found"}), 404
    response = {
        'statusCode': code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
        'body': body
    }
    return response

def getUserIdByToken(token):
    token = token.replace("Bearer ", "")
    user_info = jwt.decode(token, secret, algorithms=["HS256"])
    return user_info['_id']
