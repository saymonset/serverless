from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.sendSms import sendSms_service
from validators.sendSms import isValidSendSms
import json
from bson.objectid import ObjectId

ns_sendSms = Namespace('sendSms', 'sendSms related endpoints')

model = ns_sendSms.model('SendSms', {
        'phone': fields.String(required=True, description='Tlf para enviar el codigo'),
    })
@ns_sendSms.route('/', methods = [ 'POST' ])
class getSendSmsswgger(Resource):
    @ns_sendSms.doc(params={'phone': {'default': '+584142711347'}})
    @ns_sendSms.expect(model, validate=True)
    def post(self,  **kwargs):
       # Obtener los datos del objeto enviado en la solicitud
        data = ns_sendSms.payload
        phone = data['phone']
        result =  isValidSendSms(phone)
        if not bool(result["resp"]):  return result 
        return sendSms_service(data) if bool(result["resp"])  else result 
