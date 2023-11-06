from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
import json
from bson.objectid import ObjectId
from helps.utils import validar_fecha
from services.vacc import create_vaccine_service, get_vaccines_list_service, get_vaccine_service, update_vaccine_service, delete_vaccine_service
from validators.applyVaccines import isValidApplyVaccine
from repository.vacc  import isValidBdVaccine, isValidBdVaccineUpdate, get_vaccine_repo
from repository.dependent  import  get_dependentById_repo
from flask_jwt_extended import jwt_required
from services.applyVaccines import delete_applyVaccines_service, update_apply_vaccine_service, create_apply_vaccine_service, get_apply__vaccine_service, get_applyVaccinesList_service

applyVaccines = Blueprint('applyVaccines', __name__)


ns_applyVaccines = Namespace('ApplyVaccines', 'ApplyVaccines related endpoints')

model = ns_applyVaccines.model('ApplyVaccines', {
    'vacinne_id': fields.String(required=True, description='ID of vaccine'),
    'dependent_id': fields.String(required=True, description='Dependent or family'),
    'lote': fields.String(required=True, description='Lote of vaccine'),
    'image': fields.String(required=False, description='Imagen to vaccine'),
    'date_apply': fields.String(required=True, description='Application of vaccine')
})

@ns_applyVaccines.route('/', methods = [ 'POST' ])
class getApplyVaccinessswgger(Resource):
    @ns_applyVaccines.expect(model, validate=True)
    @ns_applyVaccines.doc(security='apikey')
    @jwt_required()
    def post(self,  **kwargs):
         # Obtener los datos del objeto enviado en la solicitud
        data = ns_applyVaccines.payload

        #Validamos vaccine
        result = get_vaccine_repo(data["vacinne_id"])
        if result is None or "error" in result:
           return {"error": "El id no es una instancia de la clase Vaccine"}


        #Validamos dependent
        result = get_dependentById_repo(data["dependent_id"])
        if result is None or "error" in result:
           return {"error": "El id no es una instancia de la clase dependent_id"}
           
        #     # Validar campos obligatprios
        result = validar_fecha(data['date_apply'])
        if not bool(result["resp"]):  return result 


        return create_apply_vaccine_service(data)
 

 
@ns_applyVaccines.route('/<limite>/<desde>', methods = [ 'GET' ])
class get_ApplyVaccinesList(Resource):        
    @ns_applyVaccines.doc(params={'limite': {'default': 20}, 'desde': {'default': 0}})
    @ns_applyVaccines.doc(security='apikey')
    @jwt_required()
    def get(self, limite=None, desde=None):
        return get_applyVaccinesList_service(limite, desde)    

@ns_applyVaccines.route('/<id>', methods = [  'GET', 'PUT', 'DELETE' ])
class getApplyVaccinesswgger(Resource):
    @ns_applyVaccines.doc(security='apikey')
    @jwt_required()
    def get(self, id):
         return get_apply__vaccine_service(id)
    @ns_applyVaccines.doc(security='apikey')
    @jwt_required()
    def delete(self, id):
        return delete_applyVaccines_service(id)     
    @ns_applyVaccines.expect(model, validate=True)
    @ns_applyVaccines.doc(security='apikey')
    @jwt_required()
    def put(self,  id):
        # Obtener los datos del objeto enviado en la solicitud
        data = ns_applyVaccines.payload
       
        return update_apply_vaccine_service(id, data) 

 
