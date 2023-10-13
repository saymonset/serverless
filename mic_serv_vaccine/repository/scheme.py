from bson.objectid import ObjectId
from config.mongodb import mongo
from bson import ObjectId
from helps.utils import validar_object_id

def get_dependent_info(dependent_id):
    query = {'_id': ObjectId(dependent_id)}
    return mongo.db.dependents.find_one(query)

def get_scheme_info(id):
    query = {'_id': ObjectId(id)}
    return mongo.db.dependents.find_one(query)


def update_dependent_scheme(id, scheme):
    if validar_object_id(id):
        # La cadena es un ObjectId válido
        # Realiza las operaciones necesarias
        return mongo.db.dependents.update_one({"_id":{'$eq': ObjectId(id)}}, {"$set": {'scheme':scheme}}, upsert=True)
    else:
        # Maneja el error o muestra un mensaje de error
        result = {
             "TypeError": id,
             "ValueError": "La cadena no es un ObjectId válido" 
        }
        return result




    
