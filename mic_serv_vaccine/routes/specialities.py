
from flask import Blueprint, jsonify
from flask import request, Response
import json
from bson.objectid import ObjectId
from validators.specialities import isValidSpeciality
from repository.specialities  import isValidBdSpeciality, isValidBdSpecialityUpdate
from services.specialities import delete_specialities_service, update_speciality_service, create_specialities_service, get_specialitiesbyId_service, get_specialities_service

specialities = Blueprint('specialities', __name__)



@specialities.route('/', methods = ['POST'])
def create_specialities():
   # Validar campos obligatprios
    result = isValidSpeciality()
    if not bool(result["resp"]):  return result 
   # Validar campos en BD
    result =  isValidBdSpeciality()
    return create_specialities_service() if bool(result["resp"])  else result 


@specialities.route('/', methods=['GET'])
def get_specialitiess():
    return get_specialities_service()


@specialities.route('/<id>', methods = ['GET'])
def get_specialities(id):
    return get_specialitiesbyId_service(id)


@specialities.route('/<id>', methods = ['PUT'])
def update_specialities(id):
    # Validar campos obligatprios
    result = isValidSpeciality()
    if not bool(result["resp"]):  return result 
   # Validar campos en BD
    result =  isValidBdSpecialityUpdate(id)
    return update_speciality_service(id) if bool(result["resp"])  else result 


@specialities.route('/<id>', methods = ['DELETE'])
def delete_specialities(id):
    return delete_specialities_service(id)


