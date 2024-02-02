from flask import Blueprint
from flask_restx import Api
from .scheme import ns_scheme
from .genders import ns_genders
from .relationships import ns_relationships
from .specialities import ns_specialities
from .doctors import ns_doctors
from .vacc import ns_vaccine
from .dosis import ns_dosis
from .applyVaccines import ns_applyVaccines
from .sendSms import ns_sendSms
from .checkCode import ns_checkCode
from .user import ns_users
from .dependent import ns_dependents
from .reporte import ns_reporte
from .login import ns_login
from .logout import ns_logout
from .ads import ns_ads

blueprint = Blueprint('Vaccine API', __name__, url_prefix='/api')

# Authorization 
authorization = {
    'apikey': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

api_extension = Api(
    blueprint,
    title='Vaccine Scheduler API',
    version='1.0',
    description='API documentation for an app to manage and schedule vaccines.',
    doc='/doc',
    authorizations=authorization
)

api_extension.add_namespace(ns_scheme)
api_extension.add_namespace(ns_genders)
api_extension.add_namespace(ns_relationships)
api_extension.add_namespace(ns_specialities)
api_extension.add_namespace(ns_doctors)
api_extension.add_namespace(ns_vaccine)
api_extension.add_namespace(ns_dosis)
api_extension.add_namespace(ns_applyVaccines)
api_extension.add_namespace(ns_sendSms)
api_extension.add_namespace(ns_checkCode)
api_extension.add_namespace(ns_users)
api_extension.add_namespace(ns_dependents)
api_extension.add_namespace(ns_reporte)
api_extension.add_namespace(ns_login)
api_extension.add_namespace(ns_logout)
api_extension.add_namespace(ns_ads)

