# mi_clase.py
from flask import Flask, request, jsonify,  request, Response
import json
from phonenumbers import carrier
from phonenumbers.phonenumberutil import number_type
import phonenumbers



def isValidSendSms(phone):
   
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

 
def isValidCode(code):
   
     if     not code:
               return {"resp":False,
                "phone":"El code es obligatorio"}
     
     try:
          int(code)
          return {"resp":True}
     except ValueError:
          return {"resp":False,
                "phone":"El code debe ser numero"}
     
     
  