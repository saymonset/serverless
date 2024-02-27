from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
import json
from services.dosis import create_dosis_service, get_dosiss_list_service, get_dosis_service, update_dosis_service, delete_dosis_service
from validators.dosis import isValiddosis
from repository.dosis import isValidBddosis, isValidBddosisUpdate
import json
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required, JWTManager
 
 

ns_dosis = Namespace('dosis', 'dosis related endpoints')

model = ns_dosis.model('dosis', {
    'name': fields.String(required=True, description='Name of dosis'),
    'vacinne_id': fields.String(required=True, description='vacinne_id of dosis'),
    'age_frequency': fields.String(required=True, description='age_frequency of dosis'),
    'rowReporte': fields.String(required=True, description='Row report of excel'),
    'columReporte': fields.String(required=True, description='Column report of excel'),
})



@ns_dosis.route('/', methods = [ 'POST' ])
class getdosisssswgger(Resource):
    @ns_dosis.doc(params={'status': {'default': True}})
    @ns_dosis.expect(model, validate=True)
    @ns_dosis.doc(security='apikey')
    @jwt_required()
    def post(self,  **kwargs):
         # Obtener los datos del objeto enviado en la solicitud
        data = ns_dosis.payload
         # Validar campos en BD
        result =  isValidBddosis(data)
        return create_dosis_service(data) if bool(result["resp"])  else result  

 

@ns_dosis.route('/<limite>/<desde>/<query>', methods = [ 'GET' ])
class getdosisswgger(Resource):       
   @ns_dosis.doc(params={'limite': {'default': 20}, 'desde': {'default': 0}})
   @ns_dosis.doc(security='apikey')
   @jwt_required() 
   def get(self, limite, desde, query=None):
      return get_dosiss_list_service(limite, desde,query)

  
@ns_dosis.route('/<id>', methods = [  'GET', 'PUT', 'DELETE' ])
class getDosiswgger(Resource):
    @ns_dosis.doc(security='apikey')
    @jwt_required()
    def get(self, id):
         return get_dosis_service(id)
    @ns_dosis.doc(security='apikey')
    @jwt_required()
    def delete(self, id):
        return delete_dosis_service(id)     
    @ns_dosis.expect(model, validate=True)
    @ns_dosis.doc(security='apikey')
    @jwt_required()
    def put(self,  id):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_dosis.payload
         # Validar campos en BD
        result =  isValidBddosisUpdate(id, data)
        return update_dosis_service(id, data) if bool(result["resp"])  else result 

 


