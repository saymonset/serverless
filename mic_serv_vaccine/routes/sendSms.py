from flask import Blueprint
from flask import request, Response
from services.sendSms import sendSms_service
from validators.sendSms import isValidSendSms
#from repository.sendSms import isValidBdgenders, isValidBdgendersUpdate
import json
from bson.objectid import ObjectId

sendSms = Blueprint('sendSms', __name__)


 


@sendSms.route('/', methods = ['POST'])
def create_sendSms():
    # Validar campos obligatprios
    result = isValidSendSms()
    if not bool(result["resp"]):  return result 
     # Validar campos en BD
    # result =  isValidBdgenders()
    return sendSms_service() if bool(result["resp"])  else result 
    
 