from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.relationships import create_relationships_service, get_relationshipsList_service, get_relationships_service, update_relationships_service, delete_relationships_service
from repository.relationships import isValidBdRelationships, isValidBdRelationshipsUpdate
import json
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required

ns_relationships = Namespace('relationships', 'Relationships related endpoints')

model = ns_relationships.model('Relationships', {
    'name': fields.String(required=True, description='Name of relationships'),
})

@ns_relationships.route('/', methods = [ 'POST' ])
class getRelationshipsswgger(Resource):
    @ns_relationships.expect(model, validate=True)
    @ns_relationships.doc(security='apikey')
    @jwt_required()
    def post(self,  **kwargs):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_relationships.payload
        name = data['name']
         # Validar campos en BD
        result =  isValidBdRelationships(name)
        return create_relationships_service(name) if bool(result["resp"])  else result  

@ns_relationships.route('/<limite>/<desde>', methods = [ 'GET' ])
class get_relationshipsList(Resource):        
    @ns_relationships.doc(params={'limite': {'default': 20}, 'desde': {'default': 0}})
    @ns_relationships.doc(security='apikey')
    @jwt_required()
    def get(self, limite=None, desde=None):
        return get_relationshipsList_service(limite, desde)



@ns_relationships.route('/<id>', methods = [  'GET', 'PUT', 'DELETE' ])
class getRelationshipsswgger(Resource):
    @ns_relationships.doc(security='apikey')
    @jwt_required()
    def get(self, id):
         return get_relationships_service(id)
    @ns_relationships.doc(security='apikey')
    @jwt_required() 
    def delete(self, id):
        return delete_relationships_service(id)     
    @ns_relationships.expect(model, validate=True)
    @ns_relationships.doc(security='apikey')
    @jwt_required()
    def put(self,  id):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_relationships.payload
         # Validar campos en BD
        result =  isValidBdRelationshipsUpdate(id, data)
        return update_relationships_service(id, data) if bool(result["resp"])  else result 
