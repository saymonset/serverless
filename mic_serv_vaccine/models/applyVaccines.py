from models.vaccine import  VaccineModels
class ApplyVaccineModels:
    def __init__(self, lote:str, vacinne_id:str, status:bool):
        self.lote = lote
        self.vacinne_id = vacinne_id
        self.status = status
 