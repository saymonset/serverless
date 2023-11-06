from flask import Flask
from flask_restx import Namespace, Resource, fields, Api
from dotenv import load_dotenv
import os
from config.mongodb import mongo
from routes import blueprint

load_dotenv()
app = Flask(__name__)
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['RESTPLUS_MASK_SWAGGER'] = False
mongo.init_app(app)
app.register_blueprint(blueprint)

  