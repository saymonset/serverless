
from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.login import login
from helps.token import verifyToken
from validators.genders import isValidGenders
import json
from bson.objectid import ObjectId

 

ns_login = Namespace('login', 'Login related endpoints')
 

login_model = ns_login.model('login', {
    'ci': fields.String(required=True, description='CI of user'),
    'password': fields.String(required=True, description='Password of user') 
})
 

@ns_login.route('/', methods = [ 'POST' ])
class getloginwgger(Resource):
    @ns_login.expect(login_model, validate=True)
    def post(self,  **kwargs):
        # Obtener los datos del objeto enviado en la solicitud
        user_data = ns_login.payload
        return login(user_data) 

 