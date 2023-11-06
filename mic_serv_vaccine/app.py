from flask import Flask
from dotenv import load_dotenv
import os
from config.mongodb import mongo
from routes import blueprint
from flask_jwt_extended import JWTManager

load_dotenv()
app = Flask(__name__)
app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['RESTPLUS_MASK_SWAGGER'] = False
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET')
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(hours=os.getenv('JWT_EXPIRE_TIME'))
 
jwt = JWTManager(app)
mongo.init_app(app)
app.register_blueprint(blueprint)

  