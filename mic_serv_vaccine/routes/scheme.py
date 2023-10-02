
from flask import Blueprint

from flask import request, Response
from services.vacc import create_vaccine_service, get_vaccines_service, get_vaccine_service, update_vaccine_service, delete_vaccine_service
from validators.vaccine import isValidVaccine
from repository.vacc import isValidBdVaccine, isValidBdVaccineUpdate
import json
from bson.objectid import ObjectId
vaccine = Blueprint('vaccine', __name__)


@vaccine.route('/', methods=['GET'])
def get_scheme():
    return get_vaccines_service()

 


