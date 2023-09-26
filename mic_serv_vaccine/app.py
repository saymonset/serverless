from flask import Flask, render_template
from dotenv import load_dotenv
import os
from config.mongodb import mongo
from routes.vacc import vaccine 
from routes.applyVaccines import applyVaccines 

load_dotenv()

app = Flask(__name__)
print(os.getenv('MONGO_URI'))
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
mongo.init_app(app)
print(mongo.db)

app.register_blueprint(vaccine, url_prefix='/vaccine')
app.register_blueprint(applyVaccines, url_prefix='/applyVaccines')

