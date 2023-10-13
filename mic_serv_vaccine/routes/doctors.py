from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
import flask 
import json
from bson import ObjectId
from validators.doctors import isValid
from repository.doctors  import isValidBdDoctors, isValidBdDoctorUpdate
from repository.user  import isValidBdUser
from services.doctors import delete_doctor_service, update_doctors_service, create_doctors_service, get_doctorsbyId_service, get_doctors_list_service
from helps.utils import validar_object_id
from helps.token import verifyToken


ns_doctors = Namespace('doctors', 'Doctors related endpoints')

model = ns_doctors.model('Doctors', {
    'user_id': fields.String(required=True, description='Id of the user'),
    'status': fields.Boolean(required=True, description='status of the Doctor'),
})


@ns_doctors.route('/', methods = [ 'POST' ])
class getDoctorssswgger(Resource):
    @ns_doctors.doc(params={'status': {'default': True}})
    @ns_doctors.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    @ns_doctors.expect(model, validate=True)
    def post(self,  **kwargs):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_doctors.payload
        result = isValidBdUser(data)
        if not bool(result["resp"]):  return result 
         # Validar campos en BD
        result =  isValidBdDoctors(data)
        if not bool(result["resp"]):  return result 

        result = verifyToken(request)
        return create_doctors_service(data) if bool(result["resp"])  else result  


@ns_doctors.route('/<limite>/<desde>', methods = [ 'GET' ])
class get_doctorsList(Resource):        
    @ns_doctors.doc(params={'limite': {'default': 30}, 'desde': {'default': 0}})
    @ns_doctors.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    def get(self, limite=None, desde=None):
        result = verifyToken(request)
        return get_doctors_list_service(limite, desde) if bool(result["resp"])  else result 



@ns_doctors.route('/<id>', methods = [  'GET', 'PUT', 'DELETE' ])
class getDoctorsswgger(Resource):
    @ns_doctors.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    def get(self, id):
         result = verifyToken(request)
         return get_doctorsbyId_service(id)  if bool(result["resp"]) else result 

    @ns_doctors.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})     
    def delete(self, id):
        result = verifyToken(request)
        return delete_doctor_service(id)  if bool(result["resp"]) else result      

    @ns_doctors.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})    
    @ns_doctors.expect(model, validate=True)
    def put(self,  id):
        # Obtener los datos del objeto enviado en la solicitud
        data = ns_doctors.payload
        result = isValidBdUser(data)
        if not bool(result["resp"]):  return result 

         # Validar campos en BD
        result =  isValidBdDoctorUpdate(id, data)
        if not bool(result["resp"]):  return result 

        result = verifyToken(request)
        return update_doctors_service(id, data) if bool(result["resp"]) else result 
 