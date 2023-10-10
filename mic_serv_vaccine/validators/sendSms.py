# mi_clase.py
from flask import Flask, request, jsonify,  request, Response
import json
from phonenumbers import carrier
from phonenumbers.phonenumberutil import number_type
import phonenumbers



def isValidSendSms():
    data = request.get_json()
    phone = data.get("phone")
  
    if     not phone:
               return {"resp":False,
                "phone":"El phone es obligatorio"}

    if (carrier._is_mobile(number_type(phonenumbers.parse(phone)))):
         return {"resp":True}
    else: 
         return {
                'resp':False,
                'statusCode': 400,
                'body': "Provided phone number has a incorrect format. try again."
                }

 
 