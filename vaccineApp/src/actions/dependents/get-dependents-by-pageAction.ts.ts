import vaccinesApi from "../../config/api/vaccinesApi";
import { DependentBDResponse } from "../../infrastructure/interfaces/dependent-bd-interface";
import { DependentResponse } from "../../infrastructure/interfaces/dependent-interface";
import { SendSMSResponse } from "../../infrastructure/interfaces/sendSms.response";
import { DependentMapper } from "../../infrastructure/mappers/dependent/dependent-mapper";

const returnMapper = ( data: DependentBDResponse ): DependentResponse => {
  return  DependentMapper.dependentBDToEntity(data);
}


  export const getDependentByPageAction = async (limite:number =1000, page:number, term:string = "''") => {
    try {

      
      
      let offset = page * 10;
      let desde = offset;
      //{{url}}/dependent/30/0/''
      const response = await vaccinesApi.get<DependentBDResponse>(`/dependent/${limite}/${desde}/${term}`);

      const { data } = response;
      
        //let {data} = response;
        console.log(data.dependents[0])
        return returnMapper(data).dependents;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
     
      return [];
    }
  };
