from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
import json
from services.vacc import create_vaccine_service, get_vaccines_list_service, get_vaccine_service, update_vaccine_service, delete_vaccine_service
from validators.vaccine import isValidVaccine
from repository.vacc import isValidBdVaccine, isValidBdVaccineUpdate
import json
from bson.objectid import ObjectId


 

ns_vaccine = Namespace('vaccine', 'Vaccine related endpoints')

model = ns_vaccine.model('Vaccines', {
    'name': fields.String(required=True, description='Name of vaccine'),
    'description': fields.String(required=True, description='Description of vaccine'),
    'disease': fields.String(required=True, description='Disease of vaccine'),
    'dosis': fields.String(required=True, description='Dosis of vaccine'),
    'application_age': fields.String(required=True, description='Application age of vaccine'),
    'isChildren': fields.Boolean(required=True, description='isChildren to vaccine'),
    'status': fields.Boolean(required=True, description='Status to vaccine'),
})

@ns_vaccine.route('/', methods = [ 'POST' ])
class getVaccinessswgger(Resource):
    @ns_vaccine.doc(params={'status': {'default': True}})
    @ns_vaccine.expect(model, validate=True)
    def post(self,  **kwargs):
         # Obtener los datos del objeto enviado en la solicitud
        data = ns_vaccine.payload
         # Validar campos en BD
        result =  isValidBdVaccine(data)
        return create_vaccine_service(data) if bool(result["resp"])  else result  


@ns_vaccine.route('/<limite>/<desde>', methods = [ 'GET' ])
class get_vaccionesList(Resource):        
    @ns_vaccine.doc(params={'limite': {'default': 20}, 'desde': {'default': 0}})
    def get(self, limite=None, desde=None):
         return get_vaccines_list_service(limite, desde)

  
@ns_vaccine.route('/<id>', methods = [  'GET', 'PUT', 'DELETE' ])
class getVaccionesswgger(Resource):
    def get(self, id):
         return get_vaccine_service(id)
    def delete(self, id):
        return delete_vaccine_service(id)     
    @ns_vaccine.expect(model, validate=True)
    def put(self,  id):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_vaccine.payload
         # Validar campos en BD
        result =  isValidBdVaccineUpdate(id, data)
        return update_vaccine_service(id, data) if bool(result["resp"])  else result 

# @vaccine.route('/<id>', methods = ['GET'])
# def get_vaccine(id):
#     return get_vaccine_service(id)



    

# @vaccine.route('/<id>', methods = ['PUT'])
# def update_vaccine(id):
   
#      # Validar campos obligatprios
#     result = isValidVaccine()
#     if not bool(result["resp"]):  return result 
#      # Validar campos en BD
#     result =  isValidBdVaccineUpdate(id)
#     return update_vaccine_service(id) if bool(result["resp"])  else result 


# @vaccine.route('/<id>', methods = ['DELETE'])
# def delete_vaccine(id):
#     return delete_vaccine_service(id)


