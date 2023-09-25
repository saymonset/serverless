
from flask import Blueprint

from flask import request, Response
from services.vacc import create_vaccine_service, get_vaccines_service, get_vaccine_service, update_vaccine_service, delete_vaccine_service
from validators.Vaccine import vaccine_validate
import json
vaccine = Blueprint('vaccine', __name__)


@vaccine.route('/', methods=['GET'])
def get_vaccines():
    return get_vaccines_service()


@vaccine.route('/<id>', methods = ['GET'])
def get_vaccine(id):
    return get_vaccine_service(id)


@vaccine.route('/', methods = ['POST'])
def create_vaccine():

    tupla_objeto = vaccine_validate()
    print(tupla_objeto)
    valor_buscado = "resp"
    indice = None
    for i, elemento in enumerate(tupla_objeto):
        print(elemento)
        print(tupla_objeto)
        if type(elemento) == str and elemento == valor_buscado:
            indice = i
            break
    

    #valor_resp = tupla_objeto[indice]

    print(indice)

    #resp = create_vaccine_service() if bool(objeto["resp"])  else objeto 
  
    return tupla_objeto
    
  #return create_vaccine_service()


@vaccine.route('/<id>', methods = ['PUT'])
def update_vaccine(id):
    return update_vaccine_service(id)


@vaccine.route('/<id>', methods = ['DELETE'])
def delete_vaccine(id):
    return delete_vaccine_service(id)


