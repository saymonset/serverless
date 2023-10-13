
from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.logout import logout
from helps.token import verifyToken
from validators.genders import isValidGenders
import json
from bson.objectid import ObjectId

 

ns_logout = Namespace('logout', 'Logout related endpoints')
 
 
 

@ns_logout.route('/', methods = [ 'POST' ])
class getlogoutwgger(Resource):
    @ns_logout.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    def post(self,  **kwargs):
        result = verifyToken(request)
        if not bool(result["resp"]):  return result 
        usuario = result['usuario']
        return logout(usuario) 

 