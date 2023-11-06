from flask import Blueprint, jsonify
from flask_restx import Namespace, Resource, fields, Api
from services.scheme import get_scheme_test_service
 

ns_scheme = Namespace('ns_scheme', 'ns_scheme related endpoints')

@ns_scheme.route('/', methods=['GET'])
def get_scheme():
    return get_scheme_test_service()

 


