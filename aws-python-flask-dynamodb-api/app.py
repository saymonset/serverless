import os
import jwt

import boto3

from flask import Flask, jsonify, make_response, request
from flask_pymongo import PyMongo
from routes.vacc import vaccine 
from flask_cors import CORS
 

app = Flask(__name__)
CORS(app) 

#---------



#---------


dynamodb_client = boto3.client('dynamodb')

if os.environ.get('IS_OFFLINE'):
    dynamodb_client = boto3.client(
        'dynamodb', region_name='localhost', endpoint_url='http://localhost:8000'
    )


USERS_TABLE = os.environ['USERS_TABLE']


@app.route('/users/<string:user_id>')
def get_user(user_id):
    result = dynamodb_client.get_item(
        TableName=USERS_TABLE, Key={'userId': {'S': user_id}}
    )
    item = result.get('Item')
    if not item:
        return jsonify({'error': 'Could not find user with provided "userId"'}), 404
   
    

    return jsonify(
        {'userId': item.get('userId').get('S'), 'name': item.get('name').get('S')
         , 'phone': item.get('phone').get('S')
         , 'surname': item.get('surname').get('S')}
    )


@app.route('/users', methods=['POST'])
def create_user():
    user_id = request.json.get('userId')
    name = request.json.get('name')
    phone = request.json.get('phone')
    surname =  request.json.get('surname')
    if not user_id or not name:
        return jsonify({'error': 'Please provide both "userId" and "name"'}), 400

    app.register_blueprint(vaccine, url_prefix='/users')

    
    #return jsonify({'userId': user_id, 'name': name})

    


#-------------

@app.route('/sendSms', methods=['POST'])
def send_sms():
    phone = request.json.get('phone');

    result = dynamodb_client.get_item(
        TableName=USERS_TABLE, Key={'phone': {'S': phone}}
    )
   

    return jsonify({'phone': phone, 'result':result})


#-------------

@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
