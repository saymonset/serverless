import { PlanVaccineByDependentEntity } from '../../domain/entities/PlanVaccineByDependentEntity';
import { DosisEntity, VaccineByIDEntity, VaccineEditCreateEntiy, VaccinePostEntity, VaccinePutEntity, VaccinePutPostResponseEntity } from '../../domain/entities/VaccineEditCreateEntity';
import { ApplyVaccineCreateResponse } from "../interfaces/apply-vaccine-response"
import { DosisByIDResponse } from '../interfaces/create-edit-dosis-response';
import { VaccineByIDResponse, VaccineEditCreateResponse, VaccinePostResponse, VaccinePutResponse } from "../interfaces/create-edit-vaccines-response"
import { PlanVaccineByDependentResponse } from '../interfaces/plan-vaccine-response';

export class PlanVaccinesByDependentMapper {
  
 
    static getVaccinesToEntity( response:  VaccineEditCreateResponse):VaccineEditCreateEntiy {
       // Ordenar el array de vacunas por el nombre
       response.vaccines.sort((a, b) => a.name.localeCompare(b.name));

        // Filtrar las vacunas únicas por _id
        const uniqueVaccinesById = response.vaccines
              .map(vaccine => ({ ...vaccine, isChecked: false })) // Update the isChecked property to false for each vaccine
              .filter((vaccine, index, self) =>
                index === self.findIndex(v => v._id.$oid === vaccine._id.$oid)
              );
  // const uniqueVaccinesById = response.vaccines.filter((vaccine, index, self) =>
  //           index === self.findIndex((v) => (
  //             v._id.$oid === vaccine._id.$oid
  //           ))
  //         );

      return {
        desde:    response.desde,
        limite:   response.limite,
        total:    response.total,
        vaccines: uniqueVaccinesById
      }
    }
 

    static vaccinesByIDToEntity( response:  PlanVaccineByDependentResponse):string[] {
   
      if (Array.isArray(response.result)) {
        return response.result.map(plan => plan.vacinne_id);
      } else {
        return [];
      }
    
    }
     
  }
      