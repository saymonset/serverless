# mi_clase.py
from phonenumbers import carrier
from phonenumbers.phonenumberutil import number_type
import phonenumbers


def isValidSendSms(phone):
    if not phone:
        return {"statusCode": 400, "resp": False, "message": "El phone es obligatorio"}

    if carrier._is_mobile(number_type(phonenumbers.parse(phone))):
        return {"resp": True}
    else:
        return {
            "resp": False,
            "statusCode": 400,
            "message": "Provided phone number has a incorrect format. try again.",
        }


def isValidCode(code):
    if not code:
        return {"statusCode": 400, "resp": False, "message": "El code es obligatorio"}

    try:
        int(code)
        return {"resp": True}
    except ValueError:
        return {"statusCode": 400, "resp": False, "message": "El code debe ser numero"}

def isValidCi(ci):
    if not ci:
        return {"statusCode": 400, "resp": False, "message": "CI es obligatorio"}
    
    return {"resp": True}

   
