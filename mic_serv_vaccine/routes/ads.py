from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
import json
from bson.objectid import ObjectId
from validators.specialities import isValidSpeciality
from repository.ads  import isValidBdAds, isValidBdAdsUpdate
from services.ads import delete_ads_service, update_ads_service, create_ads_service, get_adsbyId_service, get_adsList_service

ns_ads = Namespace('ads', 'ads related endpoints')

model = ns_ads.model('ads', {
    'title': fields.String(required=True, description='Name of the ads'),
    'img': fields.String(required=True, description='Url of the img ads'),
    'link': fields.String(required=True, description='Link of the ads'),
})


@ns_ads.route('/', methods = [ 'POST' ])
class getadssswgger(Resource):
    @ns_ads.expect(model, validate=True)
    def post(self,  **kwargs):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_ads.payload
        name = data['title']
         # Validar campos en BD
        result =  isValidBdAds(name)
        return create_ads_service(data) if bool(result["resp"])  else result  

@ns_ads.route('/<limite>/<desde>', methods = [ 'GET' ])
class get_adsList(Resource):        
    @ns_ads.doc(params={'limite': {'default': 20}, 'desde': {'default': 0}})
    def get(self, limite=None, desde=None):
        return get_adsList_service(limite, desde)


@ns_ads.route('/<id>', methods = [  'GET', 'PUT', 'DELETE' ])
class getadsswgger(Resource):
    def get(self, id):
         return get_adsbyId_service(id)
    def delete(self, id):
        return delete_ads_service(id)     
    @ns_ads.expect(model, validate=True)
    def put(self,  id):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_ads.payload
         # Validar campos en BD
        result =  isValidBdAdsUpdate(id, data)
        return update_ads_service(id, data) if bool(result["resp"])  else result 



 

