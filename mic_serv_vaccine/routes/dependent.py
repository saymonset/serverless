
from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.dependent import create_dependents_service, get_dependentList_service, get_dependentsbyId_service, delete_dependent_service, update_dependent_service
from helps.token import verifyToken
from helps.utils import validar_email
from validators.genders import isValidGenders
from repository.genders import isValidBdgenders, isValidBdgendersUpdate, get_gender_repo
from repository.relationships import get_relationships_repo
from repository.user    import get_user_repo, isValidBdEmail
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

 
@ns_dependents.route('/<limite>/<desde>/<query>', methods = [ 'GET' ])
class getdependentswgger(Resource):       
   @ns_dependents.doc(security='apikey')
   @jwt_required() 
   def get(self, limite, desde, query=None):
      #Validamos id pk de entrada
      result = get_user_repo(get_jwt_identity())
      if result is None or "error" in result:
         return {    "error":False,
                     "resp":False,
                     "statusCode": "badToken",
                     "ValueError": "El token no es valido",
                     "message":"El token no es valido",
           } 
           
      return get_dependentList_service(limite, desde, get_jwt_identity(),query)


@ns_dependents.route('/<limite>/<desde>/<id_user>/<query>', methods = [ 'GET' ])
class getdependentByUser(Resource):       
   @ns_dependents.doc(security='apikey')
   @jwt_required() 
   def get(self, limite, desde, id_user, query=None):
      #Validamos id pk de entrada
      result = get_user_repo(id_user)
      if result is None or "error" in result:
         return {  "error":False,
                     "resp":False,
                     "statusCode": "badUserid",
                     "ValueError": "El user_id no es una instancia de la clase User",
                     "message":"El user_id no es una instancia de la clase User",
           }
      return get_dependentList_service(limite, desde, id_user,query) 

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
 
@ns_dependents.route('/p', methods = [  'POST' ])
class postauxDependentswgger(Resource):

    @ns_dependents.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})    
    @ns_dependents.doc(security='apikey')
    @jwt_required()
    @ns_dependents.expect(model, validate=True)
    def post(self):
        result = verifyToken(request)
        if not bool(result["resp"]):  return result 
        usuario = result['usuario']
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_dependents.payload
        #Validamos id pk de entrada
        result = get_user_repo(get_jwt_identity())
        if result is None or "error" in result:
           return {  "error":False,
                     "resp":False,
                     "statusCode": "badUserid",
                     "ValueError": "El user_id no es una instancia de la clase User",
                     "message":"El user_id no es una instancia de la clase User",
           }
 
         #Validamos genero
        result = get_gender_repo(data["gender_id"])
        if result is None or "error" in result:
           return  {  "error":False,
                     "resp":False,
                     "statusCode": "badMissingGender_id",
                     "ValueError": "El gender_id no es una instancia de la clase GenderModels",
                     "message":"El gender_id no es una instancia de la clase GenderModels",
           }
        
           #Validamos relacion
        result = get_relationships_repo(data["relationship_id"])
        if result is None or "error" in result:
           return {  "error":False,
                              "resp":False,
                              "statusCode": "badRelationShipid",
                              "ValueError": "Relationship_id no es una instancia de la clase relationship_id",
                              "message":"Relationship_id no es una instancia de la clase relationship_id",
                  }
         
      #   No se valida o se exige mail a los dependent
      #   if 'email' in data and not validar_email(data["email"]):
      #      return {           "error":False,
      #                         "resp":False,
      #                         "statusCode": "badNotValidEmail",
      #                         "ValueError": "No es valido el email",
      #                         "message":"No es valido el email",
      #             }
         
      #   result = isValidBdEmail(data)
      #   if not bool(result["resp"]):  return result 
           #Validamos CI
        result = checkUserDependent({"name": data["name"], "lastname": data["lastname"]
                                     ,'isUser': False
                                     ,"user_id": get_jwt_identity() })                           
        if result:
           return {           "error":False,
                              "resp":False,
                              "statusCode": "badDependentExist",
                              "ValueError": "El dependent exist in bd",
                              "message":"El dependent exist in bd",
                  }
    
        return create_dependents_service(data, usuario) 