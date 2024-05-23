import vaccinesApi from "../../config/api/vaccinesApi";
import { DependentBDResponse } from "../../infrastructure/interfaces/dependent-bd-interface";
import { Dependent, DependentResponse } from "../../infrastructure/interfaces/dependent-interface";
import { SendSMSResponse } from "../../infrastructure/interfaces/sendSms.response";
import { DependentMapper } from "../../infrastructure/mappers/dependent/dependent-mapper";

const returnMapper = ( data: DependentBDResponse ): DependentResponse => {
  return  DependentMapper.dependentBDToEntity(data);
}


  export const getDependentByPageAction = async (limite:number =1000, page:number, term:string = "''"):Promise<Dependent[]> => {
    try {

      
      
      let offset = page * 10;
      let desde = offset;
      const response = await vaccinesApi.get<DependentBDResponse>(`/dependent/${limite}/${desde}/${term}`);
      const { data } = response;
      return returnMapper(data).dependents ?? [];
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
     
      return [];
    }
  };

  export const dependentDeleteAction = async (id:string) => {
    try {

      //  const {data} = await vaccinesApi.delete(`/dependent/${ id }`);
      
       
      const response = await vaccinesApi.delete<DependentBDResponse>(`/dependent/${id}`);

      const { data } = response;
        
      return returnMapper(data).dependents ?? [];
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
     
      return [];
    }
  };