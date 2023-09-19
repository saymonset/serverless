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
    blacklist = db.token_blacklist
    token = event['authorizationToken']
    methodArn = event['methodArn']
    print(blacklist.find_one({'token': token}))
    if (token is None):
        return {'principalId': 'unauthorized', 'policyDocument': generatePolicy('Deny', methodArn)}
    elif ("Bearer " not in token):
        return {'principalId': 'unauthorized', 'policyDocument': generatePolicy('Deny', methodArn)}
    elif (blacklist.find_one({'token': token})):
        return {'principalId': 'unauthorized', 'policyDocument': generatePolicy('Deny', methodArn)}
    token = token.replace("Bearer ", "")
    try:
        decoded = jwt.decode(token, secret, algorithms=["HS256"])
        if ('_id' in decoded):
            userId = decoded['_id']
            policyDocument = generatePolicy('Allow', methodArn)
        else:
            userId = 'unauthorized'
            policyDocument = generatePolicy('Deny', methodArn)
    except jwt.ExpiredSignatureError:
        userId = 'unauthorized'
        policyDocument = generatePolicy('Deny', methodArn)
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