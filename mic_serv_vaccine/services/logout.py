from flask import request, Response, jsonify
from bson import json_util, ObjectId
from bson.json_util import dumps
import json, os, jwt
from passlib.hash import pbkdf2_sha256
from config.mongodb  import   mongo
from helps.utils import validar_object_id
from datetime import datetime, timedelta
from repository.blacklist import    crear_blacklists_repo
from flask_jwt_extended import get_jwt_identity, jwt_required, jwt_manager




def logout(user):
    """
    The `logout` function logs out a user by adding their token to a blacklist and returning a success
    message, or returns an unauthorized error message if the user is not authenticated.
    """
    if (user):
        to_blacklist = {"token": request.headers.get('Authorization'), "user_id": user}
        crear_blacklists_repo(to_blacklist)
        message = "Logout made successfully"; 
        response = {
            'statusCode': 200,
             "resp":True,
             "message":message
        }
        return response
    response = {
        'statusCode': 401,
        'message': "Unauthorized",
        'resp':False,
    }
    return response