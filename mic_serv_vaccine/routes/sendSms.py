from flask import Blueprint
from flask_restx import Namespace, Resource, fields, Api
from flask import request, Response, Flask
from services.sendSms import sendSms_service, get_phone_in_users_service
from validators.sendSms import isValidSendSms
import json
from bson.objectid import ObjectId

ns_sendSms = Namespace("sendSms", "sendSms related endpoints")

model = ns_sendSms.model(
    "SendSms",
    {
        "phone": fields.String(required=True, description="Phone to send the SMS Verfication Code"),
    },
)


@ns_sendSms.route("/", methods=["POST"])
class getSendSmsswgger(Resource):
    @ns_sendSms.expect(model, validate=True)
    def post(self, **kwargs):
        # Obtener los datos del objeto enviado en la solicitud
        data = ns_sendSms.payload
        phone = data["phone"]
        result = isValidSendSms(phone)
        if not bool(result["resp"]):
            return result
        return sendSms_service(data) if bool(result["resp"]) else result

@ns_sendSms.route("/new", methods=["POST"])
class getSendSmsswgger(Resource):
    @ns_sendSms.expect(model, validate=True)
    def post(self, **kwargs):
        # Obtener los datos del objeto enviado en la solicitud
        data = ns_sendSms.payload
         #Tomamos el telefono que se envia
        phone = data["phone"]
       
        #Verificamos que el usuario no este registrado con este numero
        result =  get_phone_in_users_service(phone);
       
        #Si existe usuario, nos salimos
        if  not bool(result["resp"]):
            return result    

       
        result = isValidSendSms(phone)
        if not bool(result["resp"]):
            return result
        return sendSms_service(data) if bool(result["resp"]) else result       
