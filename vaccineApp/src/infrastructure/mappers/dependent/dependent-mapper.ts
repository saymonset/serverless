import { DependentBD, DependentBDResponse, Result } from "../../interfaces/dependent-bd-interface";
import { Dependent, DependentResponse } from "../../interfaces/dependent-interface";

 

export class DependentMapper {

    static dependentBDToEntity( objBD: DependentBDResponse ):DependentResponse {
      return {
        dependents: objBD.dependents.map((value)=> {
          return {
            _id:        value._id,
            age:       value.age,
            birth:      value.birth,
            days_birth: value.days_birth,
            email:      value.email,
            gender_id: value.gender_id,
            isChildren: value.isChildren,
            isUser:     value.isUser,
            lastname:   value.lastname,
            name:      value.name,
            phone:      value.phone,
            status:     value.status,
            token:      value.token,
            user_id:   value.user_id.$oid
          }
        }),
        desde:      objBD.desde,
        limite:     objBD.limite,
        total:      objBD.total,
      }
    }

          static dependentByIdToEntity( value: Result ):Dependent {
          
            return {
              _id:        value._id,
              age:       value.age,
              birth:      value.birth,
              days_birth: value.days_birth,
              email:      value.email,
              gender_id: value.gender_id,
              isChildren: value.isChildren,
              isUser:     value.isUser,
              lastname:   value.lastname,
              name:      value.name,
              phone:      value.phone ?? '',
              status:     value.status,
              token:      value.token ?? '',
              user_id:   value.user_id.$oid
            }
          
      }
  }
 