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
from helps.token import createToken
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

            token = createToken(user['_id'])
            decoded = jwt.decode(token, secret, algorithms=["HS256"])
            update_status_user_repo(user['_id'], {'status': 'verified'} )
            
            response = {
                 'resp':True,
                'statusCode': 200,
                'message' : "Code was checked successfully. Proceed with registration", 
                'token': token
            }
        else:
            response = {
                 'resp':False,
                'statusCode': 401,
                'message' : "Code was incorrect. Try again or request a new code"
            }
    else:
       
        response = {
             'resp':False,
            'statusCode': 404,
            'message' : "Error validating user. Please try again."
        }
    return response

 