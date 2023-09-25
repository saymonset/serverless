import json

class VaccineModels:
    def __init__(self, name, description=None, disease=None, dosis=None, application_age=None, isChildren=None):
        self.name = name
        self.description = description
        self.disease = disease
        self.dosis = dosis
        self.application_age = application_age
        self.isChildren = isChildren


 