# mi_clase.py
from flask import Flask, request, jsonify,  request, Response
import json




def isValidApplyVaccine():
    data = request.get_json()
    vacinne_id = data.get("vacinne_id")
    user_id = data.get("user_id")
    family_id = data.get("family_id")
    lote = data.get("lote")
    date = data.get("date")
  
    if     not vacinne_id:
               return {"resp":False,
                "vacinne_id":"La vacuna es obligatoria"}
    elif   not user_id: 
               return {"resp":False,
                "user_id":"El usuario es obligatorio"}
    elif   not family_id: 
               return {"resp":False,
                "family_id":"El familiar es obligatorio"}  
    elif   not lote: 
               return {"resp":False,
                "lote":"El numero de lote es obligatoria"} 
    elif   not date: 
               return {"resp":False,
                "date":"La fecha es obligatoria"}          

    else: return {"resp":True}

 
 