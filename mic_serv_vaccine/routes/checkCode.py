from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.checkCode import checkCode_service, check_CI_service, update_password_service
from validators.sendSms import isValidSendSms, isValidCode, isValidCi
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


@ns_checkCode.route('/passwordRecovery', methods = [ 'POST' ])
class getForgetpassword(Resource):
    @ns_checkCode.expect(model, validate=True)
    def post(self,  **kwargs):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_checkCode.payload
        ci = data['code']
        phone = data['phone']
       

        result =  isValidSendSms(phone)
        if not bool(result["resp"]):  return result 

        result =  isValidCi(ci) 
        if not bool(result["resp"]):  return result 

        #return {"statusCode": 400, "resp": True, "message": "El mero"}
        return check_CI_service(data) if bool(result["resp"])  else result 

@ns_checkCode.route('/passwordUpdate', methods = [ 'POST' ])
class getUpdatepassword(Resource):
    @ns_checkCode.expect(model, validate=True)
    def post(self,  **kwargs):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_checkCode.payload
        ci = data['code']
        phone = data['phone']
       

        result =  isValidSendSms(phone)
        if not bool(result["resp"]):  return result 

        result =  isValidCi(ci) 
        if not bool(result["resp"]):  return result 

        #return {"statusCode": 400, "resp": True, "message": "El mero"}
        return update_password_service(data) if bool(result["resp"])  else result         
