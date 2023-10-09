# mi_clase.py
from flask import Flask, request, jsonify,  request, Response
import json




def isValidRelationships():
    data = request.get_json()
    name = data.get("name")
  
    if     not name:
               return {"resp":False,
                "name":"El nombre es obligatorio"}
  
    else: return {"resp":True}

 
 