try:
  import unzip_requirements
except ImportError:
  pass
from datetime import datetime, timedelta
import json, os, jwt
from pymongo import MongoClient
from passlib.hash import pbkdf2_sha256

conn = MongoClient(os.environ.get('MONGO_URI'))
secret = os.environ.get("JWT_SECRET")
db = conn.mic_serv_users

def login(event, context):
    """
    The `login` function takes in user data, validates it, and returns a response with a token if the
    user is validated successfully, otherwise it returns an unauthorized response.
    """
    udata = json.loads(event['body'])
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

def validateUser(ci, password):
    users = db.users
    user = users.find_one({"ci": ci}) 
    print(user)
    if (user and pbkdf2_sha256.verify(password, user['password'])):
       return True, user['_id']
    return False, False