try:
  import unzip_requirements
except ImportError:
  pass
from datetime import datetime, timedelta
import json, os
from pymongo import MongoClient
import jwt

conn = MongoClient(os.environ.get('MONGO_URI'))
secret = os.environ.get('JWT_SECRET')

def checkCode(event, context):
    """
    The `checkCode` function checks if a given code matches the code associated with a user's phone
    number and returns a response accordingly.
    """
    body = json.loads(event['body'])
    phone = body['phone']
    code = body['code']
    db = conn.mic_serv_users
    users = db.users
    user = users.find_one({"phone": phone})
    if user:
        if int(code) == int(user['last_code']):
            exp_time = datetime.now() + timedelta(minutes=20)
            token = jwt.encode({'_id':str(user['_id']), 'exp': exp_time}, secret, algorithm="HS256")
            users.update_one({'_id':user['_id']}, {"$set": {'status': 'verified', 'token': token}}, upsert=False)
            body = json.dumps( { 'message' : f"Code was checked successfully. Proceed with registration", 
                                 'token': token
                                }) 
            response = {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': True,
                },
                'body': body
            }
        else:
            body = json.dumps( { 'message' : f"Code was incorrect. Try again or request a new code"}) 
            response = {
                'statusCode': 401,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': True,
                },
                'body': body
            }
    else:
        body = json.dumps( { 'message' : f"Error validating user. Please try again."}) 
        response = {
            'statusCode': 404,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            },
            'body': body
        }
    return response

