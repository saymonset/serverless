# mi_clase.py
from flask import  request




def isValid():
    data = request.get_json()
    user_id = data.get("user_id")
  
    if     not user_id:
               return {"resp":False,
                "user_id":"El user_id es obligatoro"}
    else: return {"resp":True}

 
 