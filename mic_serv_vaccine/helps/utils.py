from bson import ObjectId

def validar_object_id(id):
    try:
        ObjectId(id)
        return True
    except Exception:
        return False