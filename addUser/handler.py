import random
import boto3, json, os
from pymongo import MongoClient
from twilio.rest import Client


client = boto3.resource('dynamodb')
conn = MongoClient(os.environ.get('MONGO_URI'))

def addUser(event, context):
    db = conn.mic_serv_users
    users = db.users
    print(event['body'])
    user = json.loads(event['body'])
    user_id = users.insert_one(user).inserted_id
    body = json.dumps( { 'message' : f"user with ID {user_id} was created successfully"}) 
    response = {
        'statusCode': 201,
        'body': body
    }
    print(response)
    return response

def verifyPhone(event, context):
    inc_body = json.loads(event['body'])
    db = conn.mic_serv_users
    users = db.users
    user = users.find_one({"phone": inc_body['phone']})
    account_sid = 'AC812f8c0344d551f62a5f3f121443505a'
    auth_token = '6ceef2340bcca328dba47919c4809610'
    client = Client(account_sid, auth_token)
    rand_num = random.randint(99999,999999)
    if user:
        if 'status' not in user:
            users.update_one({'_id':user['_id']}, {"$set": {'status': 'unverified'}}, upsert=False)
            user = users.find_one({"phone": inc_body['phone']})
        if user['status'] == 'unverified':
            message = client.messages.create(
                from_='+14708024521',
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
        message = client.messages.create(
            from_='+14708024521',
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

def checkCode(event, context):
    body = json.loads(event['body'])
    print(body)
    phone = body['phone']
    code = body['code']
    db = conn.mic_serv_users
    users = db.users
    user = users.find_one({"phone": phone})
    print(user)
    if user:
        if int(code) == int(user['last_code']):
            users.update_one({'_id':user['_id']}, {"$set": {'status': 'verified'}}, upsert=False)
            body = json.dumps( { 'message' : f"Code was checked successfully. Proceed with registration"}) 
            response = {
                'statusCode': 200,
                'body': body
            }
        else:
            body = json.dumps( { 'message' : f"Code was incorrect. Try again or request a new code"}) 
            response = {
                'statusCode': 401,
                'body': body
            }
    else:
        body = json.dumps( { 'message' : f"Error validating user. Please try again."}) 
        response = {
            'statusCode': 404,
            'body': body
        }
    return response

