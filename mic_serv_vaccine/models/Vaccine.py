import json

class VaccineModels:
    def __init__(self, name:str, description:str=None, disease:str=None, dosis:str=None, 
                  application_age:str=None, isChildren:bool=None, status:bool=True):
        self.name = name
        self.description = description
        self.disease = disease
        self.dosis = dosis
        self.application_age = application_age
        self.isChildren = isChildren
        self.status = status


 