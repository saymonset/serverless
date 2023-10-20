
from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.dependent import create_dependents_service, get_dependentList_service, get_dependentsbyId_service, delete_dependent_service, update_dependent_service
from helps.token import verifyToken
from validators.genders import isValidGenders
from repository.genders import isValidBdgenders, isValidBdgendersUpdate, get_gender_repo
from repository.user    import get_user_repo
import json
from bson.objectid import ObjectId

 

ns_dependents = Namespace('dependent', 'Dependent related endpoints')
 

model = ns_dependents.model('dependent', {
    'user_id': fields.String(required=True, description='User_id of users'),
    'name': fields.String(required=True, description='Name of users'),
    'lastname': fields.String(required=True, description='Lastname of users'),
    'password': fields.String(required=True, description='Password of users'),
    'ci': fields.String(required=True, description='CI of users'),
    'email': fields.String(required=True, description='Email of users'),
    'city': fields.String(required=True, description='City of users'),
    'birth': fields.String(required=True, description='Birth of users'),
    'gender_id': fields.String(required=True, description='Gender of users'),
    'status': fields.Boolean(required=True, description='status of the Dependent'),
})
 

@ns_dependents.route('/', methods = [ 'POST' ])
class getCreateDependentswgger(Resource):
    @ns_dependents.expect(model, validate=True)
    @ns_dependents.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    def post(self,  **kwargs):

        result = verifyToken(request)
        if not bool(result["resp"]):  return result 
        usuario = result['usuario']
       # Obtener los datos del objeto enviado en la solicitud
        user_data = ns_dependents.payload

        #Validamos id pk de entrada
        result = get_user_repo(user_data["user_id"])
        if result is None or "error" in result:
           return {"error": "El id no es una instancia de la clase User"}
        
         #Validamos genero
        result = get_gender_repo(user_data["gender_id"])
        if result is None or "error" in result:
           return {"error": "El id no es una instancia de la clase GenderModels"}

        return create_dependents_service(user_data, usuario) 


@ns_dependents.route('/<limite>/<desde>/<user_id>', methods = [ 'GET' ])
class getdependentswgger(Resource):        
    def get(self, limite, desde, user_id):
        #Validamos id pk de entrada
        result = get_user_repo(user_id)
        if result is None or "error" in result:
           return {"error": "El id no es una instancia de la clase User"}
        return get_dependentList_service(limite, desde, user_id)



@ns_dependents.route('/<id>', methods = [  'GET', 'PUT', 'DELETE' ])
class getDependentswgger(Resource):
    @ns_dependents.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    def get(self, id):
         result = verifyToken(request)
         return get_dependentsbyId_service(id)  if bool(result["resp"]) else result 

    @ns_dependents.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})     
    def delete(self, id):
        result = verifyToken(request)
        return delete_dependent_service(id)  if bool(result["resp"]) else result      

    @ns_dependents.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})    
    @ns_dependents.expect(model, validate=True)
    def put(self,  id):
     
        # Obtener los datos del objeto enviado en la solicitud
        data = ns_dependents.payload

        result = verifyToken(request)
        return update_dependent_service(id, data) if bool(result["resp"]) else result 
 