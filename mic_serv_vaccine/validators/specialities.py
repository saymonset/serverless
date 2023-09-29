# mi_clase.py
from flask import  request




def isValidSpeciality():
    data = request.get_json()
    speciality = data.get("speciality")
  
    if     not speciality:
               return {"resp":False,
                "speciality":"La speciality es obligatoria"}
    else: return {"resp":True}

 
 