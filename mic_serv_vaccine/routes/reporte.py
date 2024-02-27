from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.sendSms import sendSms_service
from validators.sendSms import isValidSendSms
import json
from bson.objectid import ObjectId
from services.reporte import get_reporte_test_service, get_reporte_bydependent_srv

ns_reporte = Namespace('reporte', 'reporte related endpoints')

 
@ns_reporte.route('/', methods = [ 'GET' ])
class getReporte(Resource):
    def get(self,  **kwargs):
          return get_reporte_test_service()
      
      
      
@ns_reporte.route('/<dependentId>', methods = [ 'GET' ])
class getReporteByDependentId(Resource):
    def get(self,  dependentId):
          return get_reporte_bydependent_srv(dependentId)