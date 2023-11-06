from datetime import datetime
from repository.scheme import get_dependent_info, update_dependent_scheme, get_scheme_info
from repository.vacc import  get_vaccines_all, get_vaccine_repo
from repository.applyVaccines import  get_dependent_applied_vaccines
from dateutil.relativedelta import relativedelta

"""Generar Esquema de Vacunacion"""
    
def generate_scheme_service(dependent_id, flag=True):
    dependent = get_dependent_info(dependent_id)
    vaccines = list(get_vaccines_all(True))
    if dependent and dependent['isChildren'] is False:
        return {'msg': "Only scheme for infants available."}, 401
    if dependent and 'scheme' not in dependent:
        scheme = build_scheme(vaccines, dependent)
        update_dependent_scheme(dependent_id, scheme)
        return {'msg': "Scheme Generated."}, 201
    if 'scheme' in dependent:
        if flag:
            return {'msg': "Scheme exist."}, 200
        else:
            scheme = build_scheme(vaccines, dependent)
            update_dependent_scheme(dependent_id, scheme)
            return True
    return {'msg': "Dependent not found."}, 404

def build_scheme(vaccines, dependent):
    return [
            {'vaccine_id': str(vacc['_id']),
             'next_application':  datetime.now() if calculate_age_in_months(dependent['birth']) > int(vacc['application_age'][0]['value']) else add_months_to_date(int(vacc['application_age'][0]['value']), dependent['birth']),
             'dosis': 1,
             'is_complete': False
            } for vacc in vaccines
        ]

def get_scheme_service(id):
    dependent = get_scheme_info(id)
    if 'scheme' in dependent:
        for val in dependent['scheme']:
            val['next_application'] = str(val['next_application']) if val['next_application'] is not None else None
        return dependent['scheme'], 200
    else:
        return {'msg': "Dependent has not scheme created."}, 404


"""Actualizacion de esquema"""


def update_scheme_service(dependent_id):
    if generate_scheme_service(dependent_id, flag=False):
        dependent = get_dependent_info(dependent_id)
        vaccines = list(get_vaccines_all(True))
        appl_vaccines = list(get_dependent_applied_vaccines(dependent_id))
        if len(vaccines) == 0:
            return {'msg': "Load Vaccines first."}, 400 
        if 'scheme' not in dependent:
            return {'msg': "Scheme does not exist. Generate it first."}, 400
        if len(appl_vaccines) == 0:
            return {'msg': "Dependent does not have vaccines applied."}, 400 
        if dependent and 'scheme' in dependent:
            new_scheme = get_updated_scheme(dependent['scheme'], appl_vaccines)
            update_dependent_scheme(dependent_id, new_scheme)
            return {'msg': "Scheme Updated."}, 200
        return {'msg': "Dependent not found."}, 404
    else:
        return {'msg': "Error updating scheme. Try again."}, 500
    

def calculate_age_in_months(birthdate):
    birthdate = datetime.strptime(birthdate, "%Y-%m-%d")
    current_date = datetime.now()
    age_in_months = (current_date.year - birthdate.year) * 12 + (current_date.month - birthdate.month)
    return int(age_in_months)

def add_months_to_current_date(months_to_add):
    current_date = datetime.now()
    new_date = current_date + relativedelta(months=months_to_add)
    return new_date

def add_months_to_date(months_to_add, date):
    birthdate = datetime.strptime(date, "%Y-%m-%d")
    new_date = birthdate + relativedelta(months=months_to_add)
    return new_date

def get_updated_scheme(old_scheme, appl_vaccines):
    for appl_v in appl_vaccines:
        for scheme in old_scheme:
            if appl_v['vacinne_id'] == scheme['vaccine_id']:
                vaccine = get_vaccine_repo(scheme['vaccine_id'])
                if vaccine['dosis'] > scheme['dosis']:
                    months_to_add = int(vaccine['application_age'][scheme['dosis']]['value']) - int(vaccine['application_age'][scheme['dosis'] - 1]['value'])
                    scheme['next_application'] = add_months_to_date(months_to_add, appl_v['date_apply'])
                    scheme['dosis'] += 1
                else:
                    scheme['next_application'] = None
                    scheme['is_complete'] = True
    return old_scheme
