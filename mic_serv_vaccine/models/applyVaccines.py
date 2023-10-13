
from datetime import date
class ApplyVaccineModels:
    def __init__(self, vacinne_id:str, 
                       dependent_id:str,  
                       lote:str,  
                       image:str,  
                       date_apply:str,  
                       date_system: date,
                       status:bool):
        self.vacinne_id = vacinne_id
        self.dependent_id = dependent_id
        self.lote = lote
        self.image = image
        self.date_apply = date_apply
        self.date_system = date_system
        self.status = status
 

