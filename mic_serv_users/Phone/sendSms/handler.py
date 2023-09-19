try:
  import unzip_requirements
except ImportError:
  pass
import random
import json
import os
from pymongo import MongoClient
from twilio.rest import Client
import phonenumbers
from phonenumbers import carrier
from phonenumbers.phonenumberutil import number_type
import logging

conn = MongoClient(os.environ.get('MONGO_URI'))
account_sid = os.environ.get('TWILIO_ID')
auth_token = os.environ.get('TWILIO_AUTH_TOKEN')

def sendSms(event, context):
    """
    The function `sendSms` sends a validation code via SMS to a given phone number and updates the
    user's status accordingly.
    
    :param event: The `event` parameter is a dictionary that contains information about the event that
    triggered the function. It typically includes details such as the HTTP request body, headers, and
    other relevant information
    :param context: The `context` parameter is an object that provides information about the runtime
    environment of the function. It includes details such as the AWS request ID, function name, and
    other useful information. In this code, the `context` parameter is not used
    :return: The function `sendSms` returns a response object. The response object has two properties:
    `statusCode` and `body`. The `statusCode` indicates the status of the response (e.g., 201 for
    success, 401 for unauthorized, 400 for bad request), and the `body` contains a JSON string with a
    message indicating the result of the operation.
    """
    inc_body = json.loads(event['body'])
    db = conn.mic_serv_users
    users = db.users
    user = users.find_one({"phone": inc_body['phone']})
    print(account_sid, auth_token)
    print(inc_body['phone'])

    client = Client(account_sid, auth_token)
    rand_num = random.randint(99999,999999)
    if (carrier._is_mobile(number_type(phonenumbers.parse(inc_body['phone'])))):
        if user:
            if 'status' not in user:
                users.update_one({'_id':user['_id']}, {"$set": {'status': 'unverified'}}, upsert=False)
                user = users.find_one({"phone": inc_body['phone']})
            if user['status'] == 'unverified':
                message = client.messages.create(
                    from_='+12179190616',
                    body=f"Your validation code is: {rand_num}",
                    to=user['phone']
                )
                users.update_one({'_id':user['_id']}, {"$set": {'last_code': rand_num}}, upsert=False)
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
            client.messages.create(
                from_='+12179190616',
                body=f"Your validation code is: {rand_num}",
                to=inc_body['phone']
            )
            user = {
                'phone': inc_body['phone'],
                'last_code': rand_num,
                'status': 'unverified'
            }
            users.insert_one(user).inserted_id
            body = json.dumps( { 'message' : f"Code was sent successfully."}) 
            response = {
                'statusCode': 201,
                'body': body
            }
        return response
    else:
        return {
                'statusCode': 400,
                'body': "Provided phone number has a incorrect format. try again."
                }
