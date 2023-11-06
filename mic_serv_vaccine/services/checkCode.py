from flask_jwt_extended import create_access_token
from datetime import datetime
from repository.user import update_status_user_repo, find_one_repo




"""Registro de objetos"""


def checkCode_service(data):
    phone = data['phone']
    code = data['code']
    user = find_one_repo({"phone": phone})
    if user:
        if int(code) == int(user['last_code']):
            now = datetime.utcnow()
            #token = jwt.encode({'_id':str(user['_id']), 'exp': exp_time}, secret, algorithm="HS256")  	
            token = create_access_token(identity=str(user['_id']),expires_delta=False)
            update_status_user_repo(user['_id'], {'status': 'verified', 'token': token} )
            response = {
                'resp':True,
                'statusCode': 200,
                'message' : "Code was checked successfully. Proceed with registration", 
                'token': token
            }
        else:
            response = {
                 'resp':False,
                'statusCode': 401,
                'message' : "Code was incorrect. Try again or request a new code"
            }
    else:
        response = {
             'resp':False,
            'statusCode': 404,
            'message' : "Error validating user. Please try again."
        }
    return response

 