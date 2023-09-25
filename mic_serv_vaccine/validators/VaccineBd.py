# mi_clase.py
from flask import Flask, request, jsonify,  request, Response
from flask_wtf import FlaskForm
from config.mongodb import mongo
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
import json
 



def nameExistBd():
    data = request.get_json()
    name = data.get("name")

    vaccines = mongo.db.vaccines.find_one({'name': name, })
   

    if vaccines:
        return {"resp":False,
                "name":"El nombre y existe en bd"}
    
    return {"resp":True}

 

         