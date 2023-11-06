
from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.dependent import create_dependents_service, get_dependentList_service, get_dependentsbyId_service, delete_dependent_service, update_dependent_service
from helps.token import verifyToken
from helps.utils import validar_email
from validators.genders import isValidGenders
from repository.genders import isValidBdgenders, isValidBdgendersUpdate, get_gender_repo
from repository.relationships import get_relationships_repo
from repository.user    import get_user_repo
from repository.dependent    import checkUserDependent
import json
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity
 

ns_dependents = Namespace('dependent', 'Dependent related endpoints')
 

model = ns_dependents.model('dependent', {
   
    'name': fields.String(required=True, description='Name of dependet'),
    'lastname': fields.String(required=True, description='Lastname of dependet'),
    'email': fields.String(required=False, description='Email of dependet'),
    'phone': fields.String(required=False, description='Phone of dependet'),
    'gender_id': fields.String(required=True, description='Gender of dependet'),
    'birth': fields.String(required=True, description='Birth of dependet'),
    'relationship_id': fields.String(required=True, description='relation ship of dependet'),
})
 

@ns_dependents.route('/', methods = [ 'POST' ])
class getCreateDependentswgger(Resource):
    @ns_dependents.expect(model, validate=True)
    @ns_dependents.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    @ns_dependents.doc(security='apikey')
    @jwt_required()
    def post(self,  **kwargs):

        result = verifyToken(request)
        if not bool(result["resp"]):  return result 
        usuario = result['usuario']
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_dependents.payload

        #Validamos id pk de entrada
        result = get_user_repo(get_jwt_identity())
        if result is None or "error" in result:
           return {"error": "El user_id no es una instancia de la clase User"}
        
         #Validamos genero
        result = get_gender_repo(data["gender_id"])
        if result is None or "error" in result:
           return {"error": "El gender_id no es una instancia de la clase GenderModels"}
        
           #Validamos relacion
        result = get_relationships_repo(data["relationship_id"])
        if result is None or "error" in result:
           return {"error": "El relationship_id no es una instancia de la clase relationship_id"}
        
        if 'email' in data and not validar_email(data["email"]):
           return {"error": "No es valido el email"}

#, 'isUser': False, 'user_id': user_id
           #Validamos CI
        result = checkUserDependent({"name": data["name"], "lastname": data["lastname"]
                                     ,'isUser': False
                                     ,"user_id": get_jwt_identity() })                           
        if result:
           return {"error": "El dependent exist in bd"}

        return create_dependents_service(data, usuario) 


@ns_dependents.route('/<limite>/<desde>', methods = [ 'GET' ])
class getdependentswgger(Resource):       
   @ns_dependents.doc(security='apikey')
   @jwt_required() 
   def get(self, limite, desde):
      #Validamos id pk de entrada
      result = get_user_repo(get_jwt_identity())
      if result is None or "error" in result:
         return {"error": "El user_id no es una instancia de la clase User"}
      return get_dependentList_service(limite, desde, get_jwt_identity())


@ns_dependents.route('/<limite>/<desde>/<id_user>', methods = [ 'GET' ])
class getdependentByUser(Resource):       
   @ns_dependents.doc(security='apikey')
   @jwt_required() 
   def get(self, limite, desde, id_user):
      #Validamos id pk de entrada
      result = get_user_repo(id_user)
      if result is None or "error" in result:
         return {"error": "El user_id no es una instancia de la clase User"}
      return get_dependentList_service(limite, desde, id_user)

@ns_dependents.route('/<id>', methods = [  'GET', 'PUT', 'DELETE' ])
class getDependentswgger(Resource):
    @ns_dependents.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    @ns_dependents.doc(security='apikey')
    @jwt_required()
    def get(self, id):
         result = verifyToken(request)
         return get_dependentsbyId_service(id)  if bool(result["resp"]) else result 

    @ns_dependents.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})  
    @ns_dependents.doc(security='apikey')
    @jwt_required()   
    def delete(self, id):
        result = verifyToken(request)
        return delete_dependent_service(id)  if bool(result["resp"]) else result      

    @ns_dependents.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})    
    @ns_dependents.doc(security='apikey')
    @jwt_required()
    @ns_dependents.expect(model, validate=True)
    def put(self,  id):
        # Obtener los datos del objeto enviado en la solicitud
        data = ns_dependents.payload
        result = verifyToken(request)
        return update_dependent_service(id, data) if bool(result["resp"]) else result 
 