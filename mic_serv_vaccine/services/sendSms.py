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

from repository.user import   crear_users_repo, update_status_user_repo, get_phone_in_users_repo




"""Registro de objetos"""

def get_phone_in_users_service(phone):
   
    if phone:
        user =  get_phone_in_users_repo(phone)
        if user:
            return {
                  "error": False,
                  "statusCode": 200,
                  "resp": False,
                  "message": "El usuario existe"
                  }
        else:
            return {
                "error": False,
                "resp": True,
                "statusCode": 400,
                "message": "El usuario no existe",
            }    
    else:
            return {
                "error": True,
                "resp": True,
                "statusCode": 400,
                "message": "El telefono no existe",
            }

def sendSms_service(data):
    #Tomamos el telefono que se envia
    phone = data.get("phone")
    if phone:
        rand_num = random.randint(99999,999999)
        user =  get_phone_in_users_repo(phone)
        print('------------------1------------------------')
        if user:
            #Si no tiene status el usuqariop, se coloca como unverified su status
            if 'status' not in user:
                print('------------------2------------------------')
                data = {'status': 'unverified'}
                update_status_user_repo(user['_id'], data)
                user =  get_phone_in_users_repo(phone)
             #Si tiene como statu verified, se le manda de nuevo su codigo de tlf   
            if user['status'] == 'unverified':
                print('------------------3------------------------')
                result = sendSms_phone(phone, rand_num)
                if not bool(result["resp"]):  return result 
                print('------------------4------------------------')
                data = {'last_code': rand_num}
                update_status_user_repo(user['_id'], data)
                response = {
                    "resp":True,
                    'statusCode': 201,
                    'last_code':rand_num,
                    'message': "Code was sent successfully."
                }
            else:
                    #El usuqario pide que se le reenvie erl codigo nuevo porque ya esta verificado
                    print('------------------5------------------------')
                    result = sendSms_phone(phone, rand_num)
                    if not bool(result["resp"]):  return result 
                    
                    data = {'last_code': rand_num}
                    update_status_user_repo(user['_id'], data)
                    response = {
                        "resp":True,
                        'statusCode': 201,
                         'last_code':rand_num,
                        'message': "Code was sent successfully."
                    }
        else:    
            print('------------------6------------------------')
            #Es primera ves refgistradose en el telefono
            result = sendSms_phone(phone, rand_num)
            if not bool(result["resp"]):  return result 
            
            # The `user` variable is used to store the result of the `get_phone_in_users_repo` function, which retrieves user data from the repository based on the provided phone number.
            user = {
                'phone': phone,
                'last_code': rand_num,
                'status': 'unverified'
            }
            crear_users_repo(user)
            #users.insert_one(user).inserted_id
            response = {
                "resp":True,
                 'last_code':rand_num,
                'statusCode': 201,
                'message': 'Code was sent successfully.'
            }
        return response
    else:
        print('------------------7------------------------')
        return "Invalid payload", 400


def sendSms_phone(phone, rand_num):
    try:
        account_sid = os.environ.get('TWILIO_ID')
        auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
        client = Client(account_sid, auth_token)
        client.messages.create(
                        from_=os.environ.get('TWILIO_PHONE'),
                        body=f"Your validation code is: {rand_num}",
                        to=phone
                    )
        resp = {"resp":True,
         "statusCode": 201,
               }
        return resp
    except Exception as e:
	
        resp =    {"resp":False,
                    "statusCode": 501,
                    "error":"Hubo un error al mandar el mensaje, por favor intente nuevamente."}
        resp =    {"resp":True,
                    "statusCode": 501,
                    "error":"Temporal envio de sms. Esta hardoCode!"}
        print(str(e))
    
        return resp
 
