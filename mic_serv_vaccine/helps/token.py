try:
  import unzip_requirements
except ImportError:
  pass
import os, jwt
from pymongo import MongoClient
from repository.user import   find_one_repo
from bson import ObjectId
from repository.blacklist import    crear_blacklists_repo, find_one_blacklist_repo
from datetime import datetime, timedelta
from flask_jwt_extended import get_jwt_identity

conn = MongoClient(os.environ.get('MONGO_URI'))
secret = os.environ.get('JWT_SECRET')
db = conn.mic_serv_users

def verifyToken(request):
    """
    The `verifyToken` function checks if a token is valid and not blacklisted, and generates a policy
    document for authorization.
    """
    token = request.headers.get('Authorization')
    if token is None or "Bearer" not in token:
       
        return {'Token': False,'usuario':'unauthorized', 'resp':False}
    try:
      userId = get_jwt_identity()
      if (userId):
        query = {'_id': ObjectId(userId) }
        usuario = find_one_repo(query)
        
        if usuario is not None:
            return {'Token': True,  'usuario':usuario, 'resp':True}
        else:
            return {'Token': False, 'error':'Token no es valido  ', 'resp':False}
      else:
        return {'Token': False,'usuario':'unauthorized', 'resp':False}
    except Exception as e:
            print( e)
            return {'error': 'Invalid token', 'resp':False}