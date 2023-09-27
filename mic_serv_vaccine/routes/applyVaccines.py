
from flask import Blueprint, jsonify
from flask import request, Response
import json
from bson.objectid import ObjectId
from services.vacc import create_vaccine_service, get_vaccines_service, get_vaccine_service, update_vaccine_service, delete_vaccine_service
from validators.vaccine import isValidVaccine
from repository.vacc  import isValidBdVaccine, isValidBdVaccineUpdate
from services.applyVaccines import create_apply_vaccine_service, get_apply__vaccine_service, get_applyVacciness_service

applyVaccines = Blueprint('applyVaccines', __name__)


@applyVaccines.route('/', methods=['GET'])
def get_applyVacciness():
    return get_applyVacciness_service()


@applyVaccines.route('/<id>', methods = ['GET'])
def get_applyVaccines(id):
    return get_apply__vaccine_service(id)


@applyVaccines.route('/', methods = ['POST'])
def create_applyVaccines():
    return create_apply_vaccine_service()
    

# @applyVaccines.route('/<id>', methods = ['PUT'])
# def update_applyVaccines(id):
   
#      # Validar campos obligatprios
#     result = isValidapplyVaccines()
#     if not bool(result["resp"]):  return result 
#      # Validar campos en BD
#     result =  isValidBdapplyVaccinesUpdate(id)
#     return update_applyVaccines_service(id) if bool(result["resp"])  else result 


# @applyVaccines.route('/<id>', methods = ['DELETE'])
# def delete_applyVaccines(id):
#     return delete_applyVaccines_service(id)


