import { DependentBD, DependentBDResponse } from "../../interfaces/dependent-bd-interface";
import { Dependent, DependentResponse } from "../../interfaces/dependent-interface";
import { DependentById, DependentIDResponseBD } from "../../interfaces/dependentById-interface";

 


export class DependentIdMapper {

    static dependentToEntity( objBD: DependentIDResponseBD ):DependentById {
  
      return {
        _id:        objBD.result._id,
        name:       objBD.result.name,
        lastname:   objBD.result.lastname,
        email:      objBD.result.email,
        birth:      objBD.result.birth,
        gender_id:  objBD.result.gender_id,
        relationship_id: objBD.result.relationship_id,
        status:     objBD.result.status,
        token:      objBD.result.token,
        phone:      objBD.result.phone,
        isUser:     objBD.result.isUser,
        user_id:    objBD.result.user_id,
        isChildren: objBD.result.isChildren,
        age:        objBD.result.age,
        days_birth: objBD.result.days_birth,
        state: objBD.result.state,
        city: objBD.result.city,
    
      }

 
     
    }
  
  
  }