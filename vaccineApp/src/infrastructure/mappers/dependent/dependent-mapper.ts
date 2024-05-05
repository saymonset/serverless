import { DependentBDResponse } from "../../interfaces/dependent-bd-interface";
import { DependentResponse } from "../../interfaces/dependent-interface";

 

export class DependentMapper {

    static dependentBDToEntity( objBD: DependentBDResponse ):DependentResponse {
  
      return {
        dependents: objBD.dependents,
        desde:      objBD.desde,
        limite:     objBD.limite,
        total:      objBD.total,
        
      }
  
    }
  
  
  }