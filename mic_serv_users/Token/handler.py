try:
  import unzip_requirements
except ImportError:
  pass
import os, jwt
from pymongo import MongoClient

conn = MongoClient(os.environ.get('MONGO_URI'))
secret = os.environ.get("JWT_SECRET")
db = conn.mic_serv_users

def verifyToken(event, context):
    """
    The `verifyToken` function checks if a token is valid and not blacklisted, and generates a policy
    document for authorization.
    """
    blacklist = db.token_blacklist
    token = event['authorizationToken']
    print('---------------------1----------------------------------------')
    print(secret)
    print('---------end secret-------------------')
    print(token)
    print('---------end token-------------------')
    methodArn = event['methodArn']
    print(methodArn)
    print('---------methodArn-------------------')
    print('---------------------1.1----------------------------------------')
    if token is None or "Bearer" not in token or blacklist.find_one({'token': token}):
        print('---------------------2----------------------------------------')
        return {'principalId': 'unauthorized', 'policyDocument': generatePolicy('Deny', methodArn)}
    token = token.replace("Bearer ", "")
    try:
        print('---------------------2.0---------------------------------------')
        decoded = jwt.decode(token, secret, algorithms=["HS256"])
        print('---------------------2.0.1---------------------------------------')
        if ('_id' in decoded):
            userId = decoded['_id']
            print('---------------------2.1---------------------------------------')
            policyDocument = generatePolicy('Allow', methodArn)
        else:
            userId = 'unauthorized'
            policyDocument = generatePolicy('Deny', methodArn)
            print('---------------------2.2----------------------------------------')
    except jwt.ExpiredSignatureError:
        userId = 'unauthorized'
        policyDocument = generatePolicy('Deny', methodArn)
        print('---------------------3----------------------------------------')
    return {'principalId': userId, 'policyDocument': policyDocument}

def generatePolicy(effect, methodArn):
    return{
        'Version': '2012-10-17',
        'Statement': [
          {
            'Action': "execute-api:Invoke",
            'Effect': effect,
            'Resource': methodArn
          }
        ]
    }