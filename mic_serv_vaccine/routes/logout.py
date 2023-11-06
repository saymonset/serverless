
from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.logout import logout
from helps.token import verifyToken
from validators.genders import isValidGenders
import json
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity

ns_logout = Namespace('logout', 'Logout related endpoints')

@ns_logout.route('/', methods = [ 'POST' ])
class getlogoutwgger(Resource):
    @ns_logout.doc(headers={'Authorization': {'description': 'Bearer Access Token'}})
    @ns_logout.doc(security='apikey')
    @jwt_required()
    def post(self,  **kwargs):
        return logout(get_jwt_identity()) 

 