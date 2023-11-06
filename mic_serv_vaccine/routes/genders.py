
from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.genders import create_genders_service, get_gendersList_service, get_gender_service, update_genders_service, delete_genders_service
from validators.genders import isValidGenders
from repository.genders import isValidBdgenders, isValidBdgendersUpdate
import json
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required
 

ns_genders = Namespace('genders', 'Genders related endpoints')


genders_model = ns_genders.model('Genders', {
    'name': fields.String(required=True, description='Name of genders'),
})
 

@ns_genders.route('/', methods = [ 'POST' ])
class getGenderswgger(Resource):
    @ns_genders.expect(genders_model, validate=True)
    @ns_genders.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    @ns_genders.doc(security='apikey')
    @jwt_required()
    def post(self,  **kwargs):
       # Obtener los datos del objeto enviado en la solicitud
        gender_data = ns_genders.payload
        name = gender_data['name']
         # Validar campos en BD
        result =  isValidBdgenders(name)
        return create_genders_service(name) if bool(result["resp"])  else result 


@ns_genders.route('/<limite>/<desde>', methods = [ 'GET' ])
class getGenderswgger(Resource):        
    @ns_genders.doc(security='apikey')
    @jwt_required()
    def get(self, limite, desde):
        return get_gendersList_service(limite, desde)


@ns_genders.route('/<id>', methods = [  'GET',  'PUT', 'DELETE' ])
class getGenderswgger(Resource):
    @ns_genders.doc(security='apikey')
    @jwt_required()
    def get(self, id):
         return get_gender_service(id)
    @ns_genders.doc(security='apikey')
    @jwt_required()
    def delete(self, id):
        return delete_genders_service(id)  
    @ns_genders.doc(security='apikey')
    @jwt_required()   
    @ns_genders.expect(genders_model, validate=True)
    def put(self,  id):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_genders.payload
         # Validar campos en BD
        result =  isValidBdgendersUpdate(id)
        return update_genders_service(id, data) if bool(result["resp"])  else result 
    
  

