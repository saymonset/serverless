from bson import json_util
import json
from repository.user import    validateUser, validateUserByEmail
from repository.dependent import    checkUserDependent
from flask_jwt_extended import create_access_token

"""Login de objetos"""


def login(udata):
    isVal, id, user = validateUser(udata['ci'], udata['password'])
    if isVal:
        token = create_access_token(identity=str(user["_id"]), expires_delta=False)
        dependent_is_user = checkUserDependent({"isUser": True, "user_id": id})
        user = json_util.dumps(user)
        dependent_is_user = json_util.dumps(dependent_is_user)
        response = {
            "statusCode": 200,
            "token": token,
            "usuario": json.loads(user),
            "more": json.loads(dependent_is_user),
            "resp":True,
            "message":"successful"
        }
        return response
    response = {"statusCode": 401, "message": "Unauthorized", "resp":False}
    return response

"""Login de objetos"""

def loginByMail(udata):
    isVal, id, user = validateUserByEmail(udata['email'], udata['password'])
    if isVal:
        token = create_access_token(identity=str(user["_id"]), expires_delta=False)
        dependent_is_user = checkUserDependent({"isUser": True, "user_id": id})
        user = json_util.dumps(user)
        dependent_is_user = json_util.dumps(dependent_is_user)
        response = {
            "statusCode": 200,
            "token": token,
            "usuario": json.loads(user),
            "more": json.loads(dependent_is_user),
        }
        return response
    response = {"statusCode": 401, "body": json.dumps({"message": f"Unauthorized"})}
    return response
    