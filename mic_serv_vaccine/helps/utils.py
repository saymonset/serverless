from bson import ObjectId
from datetime import datetime

def validar_object_id(id):
    try:
        ObjectId(id)
        return True
    except Exception:
        return False

def validar_fecha(fecha_str):
    try:
        fecha = datetime.strptime(fecha_str, "%d/%m/%Y")
        return {"resp":True}
    except ValueError:
         return {"resp":False,
                "date":"La fecha tiene un formato no valido. Formato valido es: d/m/Y "}



         