
from flask import Blueprint
from services.scheme import update_scheme_service, generate_scheme_service, get_scheme_service
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required

ns_scheme = Namespace('scheme', 'Scheme related endpoints')


@ns_scheme.route('/<dependent_id>', methods = ['GET', 'POST', 'PUT'])
class getScheme(Resource):
    @ns_scheme.doc(security='apikey')
    @jwt_required()
    def get(self, dependent_id):
        return get_scheme_service(dependent_id)
    @ns_scheme.doc(security='apikey')
    @jwt_required()
    def post(self, dependent_id):
        return generate_scheme_service(dependent_id)
    @ns_scheme.doc(security='apikey')
    @jwt_required()
    def put(self, dependent_id):
        return update_scheme_service(dependent_id) 



