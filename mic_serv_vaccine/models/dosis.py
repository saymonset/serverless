
from datetime import date
class DosisModels:
    def __init__(self, vacinne_id:str, 
                       name:str,  
                       age_frequency:str,  
                       expires_in_days:int,
                       status:bool,
                       rowReporte:str,
                       columnReporte:str):
        self.vacinne_id = vacinne_id
        self.name = name
        self.age_frequency = age_frequency
        self.expires_in_days = expires_in_days
        self.status = status
        self.rowReporte = rowReporte
        self.columReporte = columnReporte
 

