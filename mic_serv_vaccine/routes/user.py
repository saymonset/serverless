from flask_restx import Namespace, Resource, fields
from flask import request
from services.user import (
    create_user_service,
    get_userList_service,
    get_userbyId_service,
    delete_user_service,
    update_user_service,
)
from helps.token import verifyToken
from helps.utils import validar_email
from repository.genders import get_gender_repo
from repository.user import find_one_repo, isValidBdEmail
from flask_jwt_extended import jwt_required


ns_users = Namespace("users", "Users related endpoints")


model = ns_users.model(
    "users",
    {
        "name": fields.String(required=True, description="Name of users"),
        "lastname": fields.String(required=True, description="Lastname of users"),
        "password": fields.String(required=True, description="Password of users"),
        "ci": fields.String(required=True, description="CI of users"),
        "email": fields.String(required=True, description="Email of users"),
        "state": fields.String(required=True, description="State where users lives"),
        "city": fields.String(required=True, description="City where user lives"),
        "birth": fields.String(required=True, description="Birth of users"),
        "gender_id": fields.String(required=True, description="Gender of users"),
    },
)


@ns_users.route("/p", methods=["POST"])
class getuserswgger(Resource):
    @ns_users.expect(model, validate=True)
    @ns_users.doc(headers={"Authorization": {"description": "Bearer Access Token"}})
    @ns_users.doc(security="apikey")
    @jwt_required()
    def post(self, **kwargs):
        #print('---------0-----------------')
        result = verifyToken(request)
        if not bool(result["resp"]):
            return result
        usuario = result["usuario"]
        # Obtener los datos del objeto enviado en la solicitud
        data = ns_users.payload
      
        #print('---------1-----------------')
        # Validamos name
        if data["name"] is None or len(data["name"]) == 0:
            # El campo está vacío
            return {"error": "Missing name" , 'resp':False, 'statusCode':'badMissingName'}
        if data["lastname"] is None or len(data["lastname"]) == 0:
            # El campo está vacío
            return {"error": "Missing lastname" , 'resp':False, 'statusCode':'badMissingLastName'}

        if data["ci"] is None or len(data["ci"]) == 0:
            # El campo está vacío
            return {"error": "Missing ci" , 'resp':False, 'statusCode':'badMissingCi'}
            
        if data["gender_id"] is None or len(data["gender_id"]) == 0:
            # El campo está vacío
            return {"error": "Missing gender_id" , 'resp':False, 'statusCode':'badMissingGender_id'}
        
        

        #print(data["name"])    
        #print('---------2-----------------')
        # Validamos CI
        result = find_one_repo({"ci": data["ci"]})
        if result:
            return {"error": "El ci existe en bd" , 'resp':False, 'statusCode':'badCi'}
            

        result = find_one_repo({"email": data["email"]})
        if result:
            return {"error": "El email existe en bd", 'resp':False, 'statusCode':'badExistEmail'}    

        if not validar_email(data["email"]):
            return {"error": "No es valido el email", 'resp':False, 'statusCode':'badNotValidEmail'}
       
        result = isValidBdEmail(data)
        if not bool(result["resp"]):  return result 

        # Validamos genero
        result = get_gender_repo(data["gender_id"])
        if result is None or "error" in result:
            return {"error": "El id no es una instancia de la clase GenderModels", 'resp':False, 'statusCode':'badGender'}

        return create_user_service(data, usuario)


@ns_users.route("/<limite>/<desde>", methods=["GET"])
class getUser(Resource):
    @ns_users.doc(security="apikey")
    @jwt_required()
    def get(self, limite, desde):
        result = verifyToken(request)
        return get_userList_service(limite, desde) if bool(result["resp"]) else result


@ns_users.route("/<id>", methods=["GET", "PUT", "DELETE"])
class getUserById(Resource):
    @ns_users.doc(headers={"Authorization": {"description": "Bearer Access Token"}})
    @ns_users.doc(security="apikey")
    @jwt_required()
    def get(self, id):
        result = verifyToken(request)
        return get_userbyId_service(id) if bool(result["resp"]) else result

    @ns_users.doc(headers={"Authorization": {"description": "Bearer Access Token"}})
    @ns_users.doc(security="apikey")
    @jwt_required()
    def delete(self, id):
        result = verifyToken(request)
        return delete_user_service(id) if bool(result["resp"]) else result

    @ns_users.doc(headers={"Authorization": {"description": "Bearer Access Token"}})
    @ns_users.doc(security="apikey")
    @ns_users.expect(model, validate=True)
    @jwt_required()
    def put(self, id):
        # Obtener los datos del objeto enviado en la solicitud
        data = ns_users.payload
        # Validamos genero
        result = get_gender_repo(data["gender_id"])
        if result is None or "error" in result:
            return {"error": "El id no es una instancia de la clase GenderModels"}

        result = verifyToken(request)
        return update_user_service(id, data) if bool(result["resp"]) else result
