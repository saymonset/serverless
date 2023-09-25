# mi_clase.py
from flask import Flask, request, jsonify,  request, Response
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
import json
# main.py
from models.Vaccine import isValid, VaccineEncoder



def vaccine_validate():
    data = request.get_json()
    vaccine = isValid(data)
    vaccine_json = json.dumps(vaccine, cls=VaccineEncoder)
    #return  vaccine_json
    #print(vaccine)
    if isinstance(vaccine, str):
         response = {
                'resp':'True',
                'obj':vaccine_json,
                'status': 201
            }
         return jsonify(response), 201
    else:
         response = {
                'resp':'False',
                'error':vaccine_json,
                'status': 400
            }
         return jsonify(response), 400
    #     # Devolver el error 401 Unauthorized
    #     response = jsonify({'error': vaccine,'resp':False})
    #     response.status_code = 401
    #     return {
    #             "name": "COVID-19 Vaccine",
    #             "description": "A vaccine to protect against COVID-19",
    #             "disease": "COVID-19",
    #             "dosis": "2 doses",
    #             "application_age": "16 years and older",
    #             "isChildren": False
    #         }

         