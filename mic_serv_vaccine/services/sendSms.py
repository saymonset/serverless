from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json

from config.mongodb  import   mongo
import random
import os
from pymongo import MongoClient
from twilio.rest import Client



import logging
from repository.sendSms import get_phone_in_users_repo, crear_users_repo




"""Registro de objetos"""


def sendSms_service():
    data = request.get_json()
 
    phone = data.get("phone")
    if phone:
        rand_num = random.randint(99999,999999)
        user =  get_phone_in_users_repo(phone)
        if user:
            if 'status' not in user:
                data = {'status': 'unverified'}
                update_status_user_repo(user['_id'], data)
                user =  get_phone_in_users_repo(phone)
            if user['status'] == 'unverified':
                sendSms_phone(phone, rand_num)
                data = {'last_code': rand_num}
                update_status_user_repo(user['_id'], data)
                body = json.dumps( { 'message' : f"Code was sent successfully."}) 
                response = {
                    'statusCode': 201,
                    'body': body
                }
            else:
                body = json.dumps( { 'message' : f"Phone number is already registered."}) 
                response = {
                    'statusCode': 401,
                    'body': body
                }
        
        else:    
            sendSms_phone(phone, rand_num)
            
            # The `user` variable is used to store the result of the `get_phone_in_users_repo` function, which retrieves user data from the repository based on the provided phone number.
            user = {
                'phone': phone,
                'last_code': rand_num,
                'status': 'unverified'
            }
            crear_users_repo(user)
            #users.insert_one(user).inserted_id
            body = json.dumps( { 'message' : f"Code was sent successfully."}) 
            response = {
                'statusCode': 201,
                'body': body
            }
        return response
    else:
        return "Invalid payload", 400


def sendSms_phone(phone, rand_num):
    account_sid = os.environ.get('TWILIO_ID')
    auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
    client = Client(account_sid, auth_token)
    message = client.messages.create(
                    from_=os.environ.get('TWILIO_PHONE'),
                    body=f"Your validation code is: {rand_num}",
                    to=phone
                )
    return message

