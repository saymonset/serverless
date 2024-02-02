
from datetime import date
class ApplyVaccineModels:
    def __init__(self, dosis_id:str, 
                       dependent_id:str,  
                       lote:str,  
                       image:str,  
                       vaccination_date: date,
                       status:bool):
        self.dosis_id = dosis_id
        self.dependent_id = dependent_id
        self.lote = lote
        self.image = image
        self.vaccination_date = vaccination_date
        self.status = status
 

