
from flask import Blueprint

from flask import request, Response
from services.genders import create_genders_service, get_gendersList_service, get_gender_service, update_genders_service, delete_genders_service
from validators.genders import isValidGenders
from repository.genders import isValidBdgenders, isValidBdgendersUpdate
import json
from bson.objectid import ObjectId
genders = Blueprint('genders', __name__)


@genders.route('/', methods=['GET'])
def get_genderss():
    return get_gendersList_service()


@genders.route('/<id>', methods = ['GET'])
def get_genders(id):
    return get_gender_service(id)


@genders.route('/', methods = ['POST'])
def create_genders():
    # Validar campos obligatprios
    result = isValidGenders()
    if not bool(result["resp"]):  return result 
     # Validar campos en BD
    result =  isValidBdgenders()
    return create_genders_service() if bool(result["resp"])  else result 
    

@genders.route('/<id>', methods = ['PUT'])
def update_genders(id):
   
     # Validar campos obligatprios
    result = isValidVaccine()
    if not bool(result["resp"]):  return result 
     # Validar campos en BD
    result =  isValidBdgendersUpdate(id)
    return update_genders_service(id) if bool(result["resp"])  else result 


@genders.route('/<id>', methods = ['DELETE'])
def delete_genders(id):
    return delete_genders_service(id)


