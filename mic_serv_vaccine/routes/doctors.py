
from flask import Blueprint, jsonify
from flask import request, Response
import json
from bson.objectid import ObjectId
from validators.doctors import isValid
from repository.doctors  import isValidBdDoctors, isValidBdSpecialityUpdate
from services.doctors import delete_doctor_service, update_speciality_service, create_doctors_service, get_doctorsbyId_service, get_doctors_list_service
from helps.utils import validar_object_id

doctors = Blueprint('doctors', __name__)



@doctors.route('/', methods = ['POST'])
def create_doctors():
   # Validar campos obligatprios
    result = isValid()
    if not bool(result["resp"]):  return result 
   # Validar campos en BD
    result =  isValidBdDoctors()
    return create_doctors_service() if bool(result["resp"])  else result 


@doctors.route('/', methods=['GET'])
def get_doctorsList():
    return get_doctors_list_service()


@doctors.route('/<id>', methods = ['GET'])
def get_doctor(id):
    return get_doctorsbyId_service(id)

# @doctors.route('/<id>', methods = ['PUT'])
# def update_doctors(id):
#     # Validar campos obligatprios
#     result = isValid()
#     if not bool(result["resp"]):  return result 
#    # Validar campos en BD
#     result =  isValidBdSpecialityUpdate(id)
#     return update_speciality_service(id) if bool(result["resp"])  else result 

@doctors.route('/<id>', methods = ['DELETE'])
def delete_doctors(id):
     if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return delete_doctor_service(id)
     else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result

   


