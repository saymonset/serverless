try:
  import unzip_requirements
except ImportError:
  pass
import os, jwt
from pymongo import MongoClient
from repository.user import   find_one_repo
from bson import ObjectId
from repository.blacklist import    crear_blacklists_repo, find_one_blacklist_repo


conn = MongoClient(os.environ.get('MONGO_URI'))
secret = os.environ.get('JWT_SECRET')
db = conn.mic_serv_users

def verifyToken(request):
    """
    The `verifyToken` function checks if a token is valid and not blacklisted, and generates a policy
    document for authorization.
    """

    
    print('----------------0--------------------------------------')
    
    token = request.headers.get('Authorization')
    event = {'authorizationToken':token,
                'methodArn':'methodArn'}

    token = event['authorizationToken']
    print('----------------1--------------------token------------------')
    methodArn = event['methodArn']
    if token is None or "Bearer" not in token or find_one_blacklist_repo({'token': token}):
        return {'principalId': 'unauthorized', 'policyDocument': generatePolicy('Deny', methodArn), 'resp':False}
    token = token.replace("Bearer ", "")
    print(token)
    try:
      print('----------------1--------------------secret------------------')
      print(secret)
      decoded = jwt.decode(token, secret, algorithms=["HS256"])
      print('----------------2--------------------------------------')

      if ('_id' in decoded):
              userId = decoded['_id']
              policyDocument = generatePolicy('Allow', methodArn)
              query = {'_id': ObjectId(userId) }
              usuario = find_one_repo(query)
              if usuario is not None:
                  # El usuario no es None, realiza las acciones necesarias
                  return {'principalId': userId, 'policyDocument': policyDocument, 'usuario':usuario, 'resp':True}
              else:
                  # El usuario es None, maneja esta situación
                  print("El usuario es None")
                  return {'principalId': userId, 'policyDocument': policyDocument, 'usuario':usuario, 'resp':False}
      else:
              userId = 'unauthorized'
              policyDocument = generatePolicy('Deny', methodArn)
              return {'principalId': userId, 'policyDocument': policyDocument, 'resp':False}
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



         