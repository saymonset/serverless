import json

class VaccineModels:
    def __init__(self, name, description=None, disease=None, dosis=None, application_age=None, isChildren=None):
        self.name = name
        self.description = description
        self.disease = disease
        self.dosis = dosis
        self.application_age = application_age
        self.isChildren = isChildren

def isValid(data):
    name = data.get("name")
    if not name:
        return "Error: El campo 'name' es obligatorio"
    description = data.get("description")
    disease = data.get("disease")
    dosis = data.get("dosis")
    application_age = data.get("application_age")
    isChildren = data.get("isChildren")
    return VaccineModels(name, description, disease, dosis, application_age, isChildren)

class VaccineEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, VaccineModels):
            # Convert the VaccineModels object to a JSON serializable format
            return {
                'name': obj.name,
                'description': obj.description,
                'disease': obj.disease,
                'dosis': obj.dosis,
                'application_age': obj.application_age,
                'isChildren': obj.isChildren
            }
        return super().default(obj)