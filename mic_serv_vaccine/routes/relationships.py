
from flask import Blueprint

from flask import request, Response
from services.relationships import create_relationships_service, get_relationshipsList_service, get_relationships_service, update_relationships_service, delete_relationships_service
from validators.relationships import isValidRelationships
from repository.relationships import isValidBdRelationships, isValidBdRelationshipsUpdate
import json
from bson.objectid import ObjectId
relationships = Blueprint('relationships', __name__)


@relationships.route('/', methods=['GET'])
def get_relationshipsList():
    return get_relationshipsList_service()


@relationships.route('/<id>', methods = ['GET'])
def get_relationships(id):
    return get_relationships_service(id)


@relationships.route('/', methods = ['POST'])
def create_relationships():
    # Validar campos obligatprios
    result = isValidRelationships()
    if not bool(result["resp"]):  return result 
     # Validar campos en BD
    result =  isValidBdRelationships()
    return create_relationships_service() if bool(result["resp"])  else result 
    

@relationships.route('/<id>', methods = ['PUT'])
def update_relationships(id):
   
     # Validar campos obligatprios
    result = isValidVaccine()
    if not bool(result["resp"]):  return result 
     # Validar campos en BD
    result =  isValidBdRelationshipsUpdate(id)
    return update_relationships_service(id) if bool(result["resp"])  else result 


@relationships.route('/<id>', methods = ['DELETE'])
def delete_relationships(id):
    return delete_relationships_service(id)


