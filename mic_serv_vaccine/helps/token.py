try:
  import unzip_requirements
except ImportError:
  pass
import os, jwt
from pymongo import MongoClient
from repository.user import   find_one_repo
from bson import ObjectId
from repository.blacklist import    crear_blacklists_repo, find_one_blacklist_repo
from datetime import datetime, timedelta


conn = MongoClient(os.environ.get('MONGO_URI'))
secret = os.environ.get('JWT_SECRET')
db = conn.mic_serv_users

def verifyToken(request):
    """
    The `verifyToken` function checks if a token is valid and not blacklisted, and generates a policy
    document for authorization.
    """
    token = request.headers.get('Authorization')

    if token is None:
       token = request.headers.get('X-Token')
    event = {'authorizationToken':token,
                'methodArn':'methodArn'}
    token = event['authorizationToken']
    
     
    methodArn = event['methodArn']
    #if token is None or "Bearer" not in token or find_one_blacklist_repo({'token': token}):
    if token is None or "Bearer" not in token:
        result  = {
                "error":False,
                "resp":False,
                "error": "unauthorized",
                "token":  token
         }
        
        return result
    token = token.replace("Bearer ", "")
    try:
      decoded = jwt.decode(token, secret, algorithms=["HS256"])

      if ('_id' in decoded):
              userId = decoded['_id']
              query = {'_id': ObjectId(userId) }
              usuario = find_one_repo(query)
              if usuario is not None:
                  # El usuario no es None, realiza las acciones necesarias
                  return {'Token': False,  'usuario':usuario, 'resp':True}
              else:
                  # El usuario es None, maneja esta situación
                  print("El usuario es None")
                  return {'Token': token, 'error':'Token no es valido  ', 'resp':False}
      else:
              return {'Token': token,'error':'unauthorized', 'resp':False}
    except jwt.ExpiredSignatureError:
            # Handle expired token error
            # For example, return a response indicating that the token has expired
            return {'error': 'Token has expired', 'resp':False}
    except jwt.InvalidTokenError:
            # Handle invalid token error
            # For example, return a response indicating that the token is invalid
            return {'error': 'Invalid token', 'resp':False}
    

def generatePolicy(effect, methodArn):
    return{
        'Version': '2012-10-17',
        'Statement': [
          {
            'Action': "execute-api:Invoke",
            'Effect': effect,
            'Resource': 'arn:aws:execute-api:us-west-2:1234567890:/users/GET'
          }
        ]
    }

def createToken(id):

    #exp_time = datetime.now() + timedelta(minutes=20)

            # Calcula la fecha y hora actual
            now = datetime.utcnow()

            # Calcula la fecha y hora de expiración sumando 20 minutos a la fecha y hora actual
            #exp_time = now + timedelta(minutes=20 * 1)
            exp_time = now + timedelta(minutes=20 * 6)
            # Calculate the expiration time as a far future date
            #exp_time = datetime.utcnow() + timedelta(days=365 * 10)

            token = jwt.encode({'_id':str(id), 'exp': exp_time}, secret, algorithm="HS256")

            # exp_time = datetime.now() + timedelta(minutes=100)
            # token = jwt.encode({"_id": str(id), 'exp': exp_time}, secret, algorithm="HS256")
            return  token


         