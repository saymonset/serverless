from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
import json
from bson.objectid import ObjectId
from validators.specialities import isValidSpeciality
from repository.specialities  import isValidBdSpeciality, isValidBdSpecialityUpdate
from services.specialities import delete_specialities_service, update_speciality_service, create_specialities_service, get_specialitiesbyId_service, get_specialities_service

ns_specialities = Namespace('specialities', 'Specialities related endpoints')

model = ns_specialities.model('Specialities', {
    'speciality': fields.String(required=True, description='Name of the speciality'),
})


@ns_specialities.route('/', methods = [ 'POST' ])
class getSpecialitiessswgger(Resource):
    @ns_specialities.expect(model, validate=True)
    def post(self,  **kwargs):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_specialities.payload
        name = data['speciality']
         # Validar campos en BD
        result =  isValidBdSpeciality(name)
        return create_specialities_service(name) if bool(result["resp"])  else result  

@ns_specialities.route('/<limite>/<desde>', methods = [ 'GET' ])
class get_specialitiesList(Resource):        
    @ns_specialities.doc(params={'limite': {'default': 20}, 'desde': {'default': 0}})
    def get(self, limite=None, desde=None):
        return get_specialities_service(limite, desde)


@ns_specialities.route('/<id>', methods = [  'GET', 'PUT', 'DELETE' ])
class getSpecialitiesswgger(Resource):
    def get(self, id):
         return get_specialitiesbyId_service(id)
    def delete(self, id):
        return delete_specialities_service(id)     
    @ns_specialities.expect(model, validate=True)
    def put(self,  id):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_specialities.payload
         # Validar campos en BD
        result =  isValidBdSpecialityUpdate(id, data)
        return update_speciality_service(id, data) if bool(result["resp"])  else result 



 

