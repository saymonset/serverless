
from flask import Blueprint

from flask import request, Response
from services.vacc import create_vaccine_service, get_vaccines_service, get_vaccine_service, update_vaccine_service, delete_vaccine_service
from validators.Vaccine import vaccine_validate
import json
vaccine = Blueprint('vaccine', __name__)


@vaccine.route('/', methods=['GET'])
def get_vaccines():
    return get_vaccines_service()


@vaccine.route('/<id>', methods = ['GET'])
def get_vaccine(id):
    return get_vaccine_service(id)


@vaccine.route('/', methods = ['POST'])
def create_vaccine():

    result = vaccine_validate()
    
    print(bool(result["resp"]))
    resp = create_vaccine_service() if bool(result["resp"])  else result 
  
    return resp
    
  #return create_vaccine_service()


@vaccine.route('/<id>', methods = ['PUT'])
def update_vaccine(id):
    return update_vaccine_service(id)


@vaccine.route('/<id>', methods = ['DELETE'])
def delete_vaccine(id):
    return delete_vaccine_service(id)


