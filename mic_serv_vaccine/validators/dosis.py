# mi_clase.py
from flask import Flask, request, jsonify,  request, Response
import json




def isValiddosis():
    data = request.get_json()
    name = data.get("name")
    vacinne_id = data.get("vacinne_id")
    age_frequency = data.get("age_frequency")
    application_age = data.get("application_age")
    dosis = data.get("dosis")
  
    if     not name:
               return {"resp":False,
                "name":"El nombre es obligatorio"}
    elif   not vacinne_id: 
               return {"resp":False,
                "vacinne_id":"La vacinne_id es obligatoria"}
    elif   not age_frequency: 
               return {"resp":False,
                "age_frequency":"La age_frequency es obligatoria"}  
    else: return {"resp":True}

 
 