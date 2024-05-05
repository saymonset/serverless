import vaccinesApi from "../../config/api/vaccinesApi";
import { DependentBD, DependentBDResponse } from "../../infrastructure/interfaces/dependent-bd-interface";
import { Dependent, DependentResponse } from "../../infrastructure/interfaces/dependent-interface";
import { DependentById, DependentIDResponse, DependentIDResponseBD } from "../../infrastructure/interfaces/dependentById-interface";
import { SendSMSResponse } from "../../infrastructure/interfaces/sendSms.response";
import { DependentIdMapper } from "../../infrastructure/mappers/dependent/dependent-Id-mapper";
import { DependentMapper } from "../../infrastructure/mappers/dependent/dependent-mapper";

const returnMapper = ( data: DependentIDResponseBD ): DependentById => {
  return  DependentIdMapper.dependentToEntity(data);
}


  export const getDependentByIdAction = async (id:string):Promise<DependentById> => {
    try {

      
      
      const response = await vaccinesApi.get<DependentIDResponseBD>(`/dependent/${id}`);

      const { data } = response;
        //let {data} = response;
        console.log({data})
        return returnMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
     
      throw new Error(`Error getting by id: ${ id }`);
      
    }
  };
