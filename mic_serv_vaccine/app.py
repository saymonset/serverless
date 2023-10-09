from flask import Flask, render_template
from dotenv import load_dotenv
import os
from config.mongodb import mongo
from routes.vacc import vaccine 
from routes.applyVaccines import applyVaccines 
from routes.specialities import specialities
from routes.doctors import doctors
from  routes.scheme import scheme
from routes.genders import genders
from routes.relationships import relationships

load_dotenv()

app = Flask(__name__)
print(os.getenv('MONGO_URI'))
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo.init_app(app)
print(mongo.db)

app.register_blueprint(vaccine, url_prefix='/vaccine')
app.register_blueprint(applyVaccines, url_prefix='/applyVaccines')
app.register_blueprint(specialities, url_prefix='/specialities')
app.register_blueprint(doctors, url_prefix='/doctors')
app.register_blueprint(scheme, url_prefix='/scheme')
app.register_blueprint(genders, url_prefix='/genders')
app.register_blueprint(relationships, url_prefix='/relationships')


