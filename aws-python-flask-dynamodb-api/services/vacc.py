from flask import request, Response
from bson import json_util, ObjectId
from config.mongodb import db

"""Registro de vacunas"""


def create_vaccine_service():
    data = request.get_json()
    userId = data.get("userId", None)
    name = data.get("name")
    phone = data.get("phone", None)
    surname = data.get("surname", None)
    
    if not user_id or not name:
        return jsonify({'error': 'Please provide both "userId" and "name"'}), 400

    # Insertar el nuevo usuario en la colección
    collection = db['vacunasSaymon']
    


    if user_id:
        new_user = {
                "user_id": user_id,
                "name": name,
                "phone": phone
            }
        response = collection.insert_one(new_user)
        result = {
            "id": str(response.inserted_id),
            "user_id": user_id,
            "name": name,
            "phone": phone
            "status": False,
        }
        return result
    else:
        return "Invalid payload", 400

 