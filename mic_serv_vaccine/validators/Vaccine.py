# mi_clase.py
from flask import Flask, request, jsonify,  request, Response
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
import json



def isValid(data):
    name = data.get("name")
    if not name:
        return {"resp":False,
                "name":"El nombre es obligatorio"}
    
    return {"resp":True}

def vaccine_validate():
    data = request.get_json()
    return isValid(data)

         