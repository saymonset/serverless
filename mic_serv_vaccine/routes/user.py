
from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.user import create_user_service
from helps.token import verifyToken
from validators.genders import isValidGenders
from repository.genders import isValidBdgenders, isValidBdgendersUpdate
import json
from bson.objectid import ObjectId

 

ns_users = Namespace('users', 'Users related endpoints')
 

users_model = ns_users.model('users', {
    'name': fields.String(required=True, description='Name of users'),
    'lastname': fields.String(required=True, description='Lastname of users'),
    'password': fields.String(required=True, description='Password of users'),
    'ci': fields.String(required=True, description='CI of users'),
    'email': fields.String(required=True, description='Email of users'),
    'city': fields.String(required=True, description='City of users'),
    'birth': fields.String(required=True, description='Birth of users'),
    'gender': fields.String(required=True, description='Gender of users'),
    'status': fields.Boolean(required=True, description='status of the user'),
})
 

@ns_users.route('/', methods = [ 'POST' ])
class getuserswgger(Resource):
    @ns_users.expect(users_model, validate=True)
    @ns_users.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    def post(self,  **kwargs):

        result = verifyToken(request)
        if not bool(result["resp"]):  return result 
        usuario = result['usuario']
       # Obtener los datos del objeto enviado en la solicitud
        user_data = ns_users.payload
        
        return create_user_service(user_data, usuario) 


# @ns_users.route('/<limite>/<desde>', methods = [ 'GET' ])
# class getuserswgger(Resource):        
#     def get(self, limite, desde):
#         return get_usersList_service(limite, desde)


# @ns_users.route('/<id>', methods = [  'GET',  'PUT', 'DELETE' ])
# class getuserswgger(Resource):
#     def get(self, id):
#          return get_gender_service(id)
#     def delete(self, id):
#         return delete_users_service(id)     
#     @ns_users.expect(users_model, validate=True)
#     def put(self,  id):
#        # Obtener los datos del objeto enviado en la solicitud
#         data = ns_users.payload
#          # Validar campos en BD
#         result =  isValidBdusersUpdate(id)
#         return update_users_service(id, data) if bool(result["resp"])  else result 
    
  

