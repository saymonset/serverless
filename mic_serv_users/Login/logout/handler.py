try:
  import unzip_requirements
except ImportError:
  pass
import json, os, jwt
from pymongo import MongoClient

conn = MongoClient(os.environ.get('MONGO_URI'))
secret = os.environ.get("JWT_SECRET")
db = conn.mic_serv_users

def logout(event, context):
    """
    The `logout` function logs out a user by adding their token to a blacklist and returning a success
    message, or returns an unauthorized error message if the user is not authenticated.
    """
    blacklist = db.token_blacklist
    user = getUserIdByToken(event['headers']['Authorization'])
    if (user):
        to_blacklist = {"token": event['headers']['Authorization'], "user_id": user}
        blacklist.insert_one(to_blacklist)
        body = json.dumps( { 'message' : f"Logout made successfully"}) 
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
        'body': "Unauthorized"
    }
    return response

def getUserIdByToken(token):
    token = token.replace("Bearer ", "")
    user_info = jwt.decode(token, secret, algorithms=["HS256"])
    return user_info['_id']