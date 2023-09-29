# mi_clase.py
from flask import Flask, request, jsonify,  request, Response
import json




def isValidVaccine():
    data = request.get_json()
    name = data.get("name")
    description = data.get("description")
    disease = data.get("disease")
    application_age = data.get("application_age")
    dosis = data.get("dosis")
  
    if     not name:
               return {"resp":False,
                "name":"El nombre es obligatorio"}
    elif   not description: 
               return {"resp":False,
                "description":"La descriptión es obligatoria"}
    elif   not disease: 
               return {"resp":False,
                "disease":"La Enfermedad es obligatoria"}  
    elif   not dosis: 
               return {"resp":False,
                "dosis":"La dosis es obligatoria"} 
    elif   not application_age: 
               return {"resp":False,
                "application_age":"A qué edad se aplica es obligatoria"}          

    else: return {"resp":True}

 
 