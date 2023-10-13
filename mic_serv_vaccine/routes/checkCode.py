from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.checkCode import checkCode_service
from validators.sendSms import isValidSendSms, isValidCode
import json, os
import jwt
from bson.objectid import ObjectId

ns_checkCode = Namespace('CheckCode', 'sendSms related endpoints')

model = ns_checkCode.model('CheckCode', {
        'phone': fields.String(required=True, description='Tlf para enviar el codigo'),
        'code': fields.String(required=True, description='Codigo enviado'),
    })
@ns_checkCode.route('/', methods = [ 'POST' ])
class getCheckCodeswgger(Resource):
    @ns_checkCode.doc(params={'phone': {'default': '+584142711347'}, 'code': {'default': 0}})
    @ns_checkCode.expect(model, validate=True)
    def post(self,  **kwargs):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_checkCode.payload
        phone = data['phone']
        code = data['code']

        result =  isValidSendSms(phone)
        if not bool(result["resp"]):  return result 

        result =  isValidCode(code) 
        if not bool(result["resp"]):  return result 

        return checkCode_service(data) if bool(result["resp"])  else result 
