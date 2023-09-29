
from flask import Blueprint, jsonify
from flask import request, Response
import json
from bson.objectid import ObjectId
from services.vacc import create_vaccine_service, get_vaccines_service, get_vaccine_service, update_vaccine_service, delete_vaccine_service
from validators.applyVaccines import isValidApplyVaccine
from repository.vacc  import isValidBdVaccine, isValidBdVaccineUpdate
from services.applyVaccines import delete_applyVaccines_service, update_apply_vaccine_service, create_apply_vaccine_service, get_apply__vaccine_service, get_applyVacciness_service

applyVaccines = Blueprint('applyVaccines', __name__)


@applyVaccines.route('/', methods=['GET'])
def get_applyVacciness():
    return get_applyVacciness_service()


@applyVaccines.route('/<id>', methods = ['GET'])
def get_applyVaccines(id):
    return get_apply__vaccine_service(id)


@applyVaccines.route('/', methods = ['POST'])
def create_applyVaccines():
     # Validar campos obligatprios
    result = isValidApplyVaccine()
    if not bool(result["resp"]):  return result 
    return create_apply_vaccine_service()
    

@applyVaccines.route('/<id>', methods = ['PUT'])
def update_applyVaccines(id):
    # Validar campos obligatprios
    result = isValidApplyVaccine()
    if not bool(result["resp"]):  return result 
    return update_apply_vaccine_service(id) 


@applyVaccines.route('/<id>', methods = ['DELETE'])
def delete_apply_vaccine_service(id):
    return delete_applyVaccines_service(id)


