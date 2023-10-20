from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json

from config.mongodb  import   mongo
import random
import os
from pymongo import MongoClient
from twilio.rest import Client
from datetime import datetime, timedelta
import jwt
import logging
from repository.user import get_phone_in_users_repo, crear_users_repo, update_status_user_repo, find_one_repo




"""Registro de objetos"""


def checkCode_service(data):
    phone = data['phone']
    code = data['code']
    user = find_one_repo({"phone": phone})
    secret = os.environ.get('JWT_SECRET')
    
    if user:
        if int(code) == int(user['last_code']):
            #exp_time = datetime.now() + timedelta(minutes=20)

            # Calcula la fecha y hora actual
            now = datetime.utcnow()

            # Calcula la fecha y hora de expiración sumando 20 minutos a la fecha y hora actual
            #exp_time = now + timedelta(minutes=20 * 1)
            exp_time = now + timedelta(minutes=20 * 6)
            # Calculate the expiration time as a far future date
            #exp_time = datetime.utcnow() + timedelta(days=365 * 10)

            token = jwt.encode({'_id':str(user['_id']), 'exp': exp_time}, secret, algorithm="HS256")
            decoded = jwt.decode(token, secret, algorithms=["HS256"])
            update_status_user_repo(user['_id'], {'status': 'verified', 'token': token} )
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



#     try:
#   import unzip_requirements
# except ImportError:
#   pass
# from datetime import datetime, timedelta
# import json, os
# from pymongo import MongoClient
# import jwt



# def checkCode(event, context):
#     """
#     The `checkCode` function checks if a given code matches the code associated with a user's phone
#     number and returns a response accordingly.
#     """
#     body = json.loads(event['body'])
#    


#     if user:
#         if int(code) == int(user['last_code']):
#             exp_time = datetime.now() + timedelta(minutes=20)
#             token = jwt.encode({'_id':str(user['_id']), 'exp': exp_time}, secret, algorithm="HS256")
#             users.update_one({'_id':user['_id']}, {"$set": {'status': 'verified', 'token': token}}, upsert=False)
#             body = json.dumps( { 'message' : f"Code was checked successfully. Proceed with registration", 
#                                  'token': token
#                                 }) 
#             response = {
#                 'statusCode': 200,
#                 'headers': {
#                     'Access-Control-Allow-Origin': '*',
#                     'Access-Control-Allow-Credentials': True,
#                 },
#                 'body': body
#             }
#         else:
#             body = json.dumps( { 'message' : f"Code was incorrect. Try again or request a new code"}) 
#             response = {
#                 'statusCode': 401,
#                 'headers': {
#                     'Access-Control-Allow-Origin': '*',
#                     'Access-Control-Allow-Credentials': True,
#                 },
#                 'body': body
#             }
#     else:
#         body = json.dumps( { 'message' : f"Error validating user. Please try again."}) 
#         response = {
#             'statusCode': 404,
#             'headers': {
#                 'Access-Control-Allow-Origin': '*',
#                 'Access-Control-Allow-Credentials': True,
#             },
#             'body': body
#         }
#     return response



 