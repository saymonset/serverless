from bson import ObjectId
from datetime import datetime
import re

def validar_object_id(id):
    try:
        ObjectId(id)
        return True
    except Exception:
        return False

def validar_fecha(fecha_str):
    try:
        fecha = datetime.strptime(fecha_str, "%Y-%m-%d")
        return {"resp":True}
    except ValueError:
         return {"resp":False,
                "date":"La fecha tiene un formato no valido. Formato valido es: d/m/Y "}

def validar_email(email):
    patron = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if re.match(patron, email):
        return True
    else:
        return False


def get_caracteres_especiales(query):
    contador = 0
    for caracter in query:
        if caracter == "'" or caracter == '"':
            contador += 1
    return contador
         