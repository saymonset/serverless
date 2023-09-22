
from flask import Blueprint

from services.vacc import create_vaccine_service

vaccine = Blueprint('vaccine', __name__)


@vaccine.route('/', methods = ['POST'])
def create_vaccine():
    return create_vaccine_service()




