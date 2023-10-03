from flask import Blueprint, jsonify
from services.scheme import get_scheme_test_service

scheme = Blueprint('scheme', __name__)


@scheme.route('/', methods=['GET'])
def get_scheme():
    return get_scheme_test_service()

 


