from flask import Blueprint
from flask_restx import Api
from .reporte import ns_reporte
from .genders import ns_genders
from .relationships import ns_relationships
from .specialities import ns_specialities
from .doctors import ns_doctors
from .vacc import ns_vaccine
from .applyVaccines import ns_applyVaccines
from .sendSms import ns_sendSms
from .checkCode import ns_checkCode
from .user import ns_users
from .dependent import ns_dependents
from .login import ns_login
from .logout import ns_logout
from .ads import ns_ads

blueprint = Blueprint('Vaccine API', __name__, url_prefix='/docs')

api_extension = Api(
    blueprint,
    title='Flask RESTplus Demo',
    version='1.0',
    description='Application tutorial to demonstrate Flask RESTplus extension\
        for better project structure and auto generated documentation',
    doc='/doc'
)

api_extension.add_namespace(ns_reporte)
api_extension.add_namespace(ns_genders)
api_extension.add_namespace(ns_relationships)
api_extension.add_namespace(ns_specialities)
api_extension.add_namespace(ns_doctors)
api_extension.add_namespace(ns_vaccine)
api_extension.add_namespace(ns_applyVaccines)
api_extension.add_namespace(ns_sendSms)
api_extension.add_namespace(ns_checkCode)
api_extension.add_namespace(ns_users)
api_extension.add_namespace(ns_dependents)
api_extension.add_namespace(ns_login)
api_extension.add_namespace(ns_logout)
api_extension.add_namespace(ns_ads)

