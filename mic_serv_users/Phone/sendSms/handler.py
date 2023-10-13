try:
  import unzip_requirements
except ImportError:
  pass
import random
import json
import os
from pymongo import MongoClient
import phonenumbers
from phonenumbers import carrier
from phonenumbers.phonenumberutil import number_type
from Utils.utils import sendSms as sendSmsService

conn = MongoClient(os.environ.get('MONGO_URI'))

def sendSms(event, context):
    """
    The function `sendSms` sends a validation code via SMS to a given phone number and updates the
    user's status accordingly.
    """
    inc_body = json.loads(event['body'])
    db = conn.mic_serv_users
    users = db.users
    user = users.find_one({"phone": inc_body['phone']})
    rand_num = random.randint(99999,999999)
    from_phone = os.environ.get('TWILIO_FROM_PHONE')
    if (carrier._is_mobile(number_type(phonenumbers.parse(inc_body['phone'])))):
        if user:
            if 'status' not in user:
                users.update_one({'_id':user['_id']}, {"$set": {'status': 'unverified'}}, upsert=False)
                user['status'] = 'unverified'
            if user['status'] == 'unverified':
                respu = sendSmsService(from_phone, f"Your validation code is: {rand_num}", user['phone'])
                print(respu)
                users.update_one({'_id':user['_id']}, {"$set": {'last_code': rand_num}}, upsert=False)
                body = json.dumps( { 'message' : f"Code was sent successfully."}) 
                response = {
                    'statusCode': 201,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': True,
                    },
                    'body': body
                }
            else:
                body = json.dumps( { 'message' : f"Phone number is already registered."}) 
                response = {
                    'statusCode': 401,
                    'headers': {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': True,
                    },
                    'body': body
                }
        else:
            respu = sendSmsService(from_phone, f"Your validation code is: {rand_num}", inc_body['phone'])    
            user = {
                'phone': inc_body['phone'],
                'last_code': rand_num,
                'status': 'unverified'
            }
            users.insert_one(user)
            body = json.dumps( { 'message' : f"Code was sent successfully."}) 
            response = {
                'statusCode': 201,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': True,
                },
                'body': body
            }
        return response
    else:
        return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': True,
                },
                'body': "Provided phone number has a incorrect format. try again."
                }
