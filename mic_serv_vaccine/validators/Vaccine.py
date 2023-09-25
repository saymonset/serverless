# mi_clase.py
from flask import Flask, request, jsonify,  request, Response
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
import json
from validators.VaccineBd import nameExistBd



def isValid():
    data = request.get_json()
    name = data.get("name")
  
    if not name:
        return {"resp":False,
                "name":"El nombre es obligatorio"}
    
    else: return validarInBD()

 

def validarInBD():
    return  nameExistBd()   

         