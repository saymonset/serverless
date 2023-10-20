
from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.user import create_user_service, get_userList_service, get_userbyId_service, delete_user_service, update_user_service
from helps.token import verifyToken
from validators.genders import isValidGenders
from repository.genders import get_gender_repo
from models.genders import GenderModels

import json
from bson.objectid import ObjectId

 

ns_users = Namespace('users', 'Users related endpoints')
 

model = ns_users.model('users', {
    'name': fields.String(required=True, description='Name of users'),
    'lastname': fields.String(required=True, description='Lastname of users'),
    'password': fields.String(required=True, description='Password of users'),
    'ci': fields.String(required=True, description='CI of users'),
    'email': fields.String(required=True, description='Email of users'),
    'city': fields.String(required=True, description='City of users'),
    'birth': fields.String(required=True, description='Birth of users'),
    'gender_id': fields.String(required=True, description='Gender of users'),
    'status': fields.String(required=True, description='status of the user'),
})
 

@ns_users.route('/', methods = [ 'POST' ])
class getuserswgger(Resource):
    @ns_users.expect(model, validate=True)
    @ns_users.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    def post(self,  **kwargs):

        result = verifyToken(request)
        if not bool(result["resp"]):  return result 
        usuario = result['usuario']
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_users.payload

        #Validamos genero
        result = get_gender_repo(data["gender_id"])
        if result is None or "error" in result:
           return {"error": "El id no es una instancia de la clase GenderModels"}
             
        
        return create_user_service(data, usuario) 


@ns_users.route('/<limite>/<desde>', methods = [ 'GET' ])
class getUser(Resource):        
    def get(self, limite, desde):
        result = verifyToken(request)
        return get_userList_service(limite, desde) if bool(result["resp"]) else result      



@ns_users.route('/<id>', methods = [  'GET', 'PUT', 'DELETE' ])
class getUserById(Resource):
    @ns_users.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    def get(self, id):
         result = verifyToken(request)
         return get_userbyId_service(id)  if bool(result["resp"]) else result 

    @ns_users.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})     
    def delete(self, id):
        result = verifyToken(request)
        return delete_user_service(id)  if bool(result["resp"]) else result      

    @ns_users.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})    
    @ns_users.expect(model, validate=True)
    def put(self,  id):
     
        # Obtener los datos del objeto enviado en la solicitud
        data = ns_users.payload
           #Validamos genero
        result = get_gender_repo(data["gender_id"])
        if result is None or "error" in result:
           return {"error": "El id no es una instancia de la clase GenderModels"}

        result = verifyToken(request)
        return update_user_service(id, data) if bool(result["resp"]) else result 