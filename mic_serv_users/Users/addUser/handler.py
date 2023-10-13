try:
  import unzip_requirements
except ImportError:
  pass
import json, os, jwt
from pymongo import MongoClient
from bson import ObjectId
from passlib.hash import pbkdf2_sha256

conn = MongoClient(os.environ.get('MONGO_URI'))
secret = os.environ.get("JWT_SECRET")
db = conn.mic_serv_users

def addUser(event, context):
    """
    The `addUser` function is used to add a new user to the database, encrypting their password and
    returning a success message.
    """
    users = db.users
    dependents = db.dependents
    user_id = getUserIdByToken(event['headers']['Authorization'])
    user_data = json.loads(event['body'])
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
    print(checkUserDependent(user_id))
    if checkUserDependent(user_id) is None:
      dependents.insert_one(user_data)
      users.update_one({'_id':ObjectId(user_id)}, {"$set": {'password': password, 'ci': ci, 'city': city, 'state': state}}, upsert=False)
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

def getUserIdByToken(token):
    token = token.replace("Bearer ", "")
    user_info = jwt.decode(token, secret, algorithms=["HS256"])
    return user_info['_id']
  
def checkUserDependent(user_id):
  return db.dependents.find_one({'user_id': user_id, 'isUser': True})
