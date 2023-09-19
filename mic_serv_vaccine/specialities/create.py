import json
import os
from pymongo import MongoClient


conn = MongoClient(os.environ.get('MONGO_URI'))
db = conn.mic_serv_users

def create(event, context):
   
    objDb = db.specialities
    inc_body = json.loads(event['body'])
    
    
    
    
    
    specialities = {
                    'name': inc_body['name']
                    }
    
    
    objDb.insert_one(specialities).inserted_id
    body = json.dumps( { 'message' : f"Create speciality successfully."})   
          
    response = {
                'statusCode': 201,
                'body': body,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': True,
                }
            }
 
    return response