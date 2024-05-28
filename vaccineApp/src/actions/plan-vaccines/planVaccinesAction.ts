import vaccinesApi from "../../config/api/vaccinesApi";
import { PlanVaccineByDependentEntity } from "../../domain/entities/PlanVaccineByDependentEntity";
import { VaccineByIDEntity } from "../../domain/entities/VaccineEditCreateEntity";
import { VaccineByIDResponse } from "../../infrastructure/interfaces/create-edit-vaccines-response";
import { PlanVaccineByDependentResponse } from "../../infrastructure/interfaces/plan-vaccine-response";
import { PlanVaccinesByDependentMapper } from "../../infrastructure/mappers/plan-vaccines-by-dependents-mapper";
import { VaccinesMapper } from "../../infrastructure/mappers/vaccines-mapper";


  export const getPlanVaccineByDependentIdAction = async (dependentId:string):Promise<string[]> => {
    try {
      
      const response = await vaccinesApi.get<PlanVaccineByDependentResponse>(`/planVaccineDependent/${dependentId}`);
      const { data } = response;
     
        return returnPlanVaccineByDependentMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
     
      throw new Error(`Error getting by id: ${ dependentId }`);
      
    }
  };

  export const updatePlanVaccineByDependentIdAction = async (dependent_id:string,  vacc:string[]) => {
    try {
      const response = await vaccinesApi.delete(`/planVaccineDependent/${dependent_id}`);
      if (vacc  &&  vacc.length>0){
        vacc.forEach(async (vacinne_id)=>{
             await vaccinesApi.post<PlanVaccineByDependentResponse>(`/planVaccineDependent`, {dependent_id, vacinne_id});
        })
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      throw new Error(`Error getting by id: ${ dependent_id }`);
    }
  };
 

 

const returnPlanVaccineByDependentMapper = ( data: PlanVaccineByDependentResponse ): string[] => {
  return  PlanVaccinesByDependentMapper.vaccinesByIDToEntity(data);
}
 