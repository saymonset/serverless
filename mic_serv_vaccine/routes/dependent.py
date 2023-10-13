
from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.dependent import create_dependents_service, get_dependentList_service
from helps.token import verifyToken
from validators.genders import isValidGenders
from repository.genders import isValidBdgenders, isValidBdgendersUpdate
import json
from bson.objectid import ObjectId

 

ns_dependents = Namespace('dependent', 'Dependent related endpoints')
 

dependent_model = ns_dependents.model('dependent', {
    'user_id': fields.String(required=True, description='User_id of users'),
    'name': fields.String(required=True, description='Name of users'),
    'lastname': fields.String(required=True, description='Lastname of users'),
    'password': fields.String(required=True, description='Password of users'),
    'ci': fields.String(required=True, description='CI of users'),
    'email': fields.String(required=True, description='Email of users'),
    'city': fields.String(required=True, description='City of users'),
    'birth': fields.String(required=True, description='Birth of users'),
    'gender': fields.String(required=True, description='Gender of users'),
    'status': fields.Boolean(required=True, description='status of the Dependent'),
})
 

@ns_dependents.route('/', methods = [ 'POST' ])
class getCreateDependentswgger(Resource):
    @ns_dependents.expect(dependent_model, validate=True)
    @ns_dependents.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    def post(self,  **kwargs):

        result = verifyToken(request)
        if not bool(result["resp"]):  return result 
        usuario = result['usuario']
       # Obtener los datos del objeto enviado en la solicitud
        user_data = ns_dependents.payload
       
        return create_dependents_service(user_data, usuario) 


@ns_dependents.route('/<limite>/<desde>/<user_id>', methods = [ 'GET' ])
class getdependentswgger(Resource):        
    def get(self, limite, desde, user_id):
        return get_dependentList_service(limite, desde, user_id)


# @ns_dependents.route('/<id>', methods = [  'GET',  'PUT', 'DELETE' ])
# class getuserswgger(Resource):
#     def get(self, id):
#          return get_gender_service(id)
#     def delete(self, id):
#         return delete_users_service(id)     
#     @ns_dependents.expect(dependent_model, validate=True)
#     def put(self,  id):
#        # Obtener los datos del objeto enviado en la solicitud
#         data = ns_dependents.payload
#          # Validar campos en BD
#         result =  isValidBdusersUpdate(id)
#         return update_users_service(id, data) if bool(result["resp"])  else result 
    
  

