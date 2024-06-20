import vaccinesApi from "../../config/api/vaccinesApi";
import { User } from "../../domain/entities/user";
import { DependentBD, DependentBDResponse, DependentByIDResponse, Result } from "../../infrastructure/interfaces/dependent-bd-interface";
import { Dependent, DependentResponse } from "../../infrastructure/interfaces/dependent-interface";
import { SendSMSResponse } from "../../infrastructure/interfaces/sendSms.response";
import { DependentMapper } from "../../infrastructure/mappers/dependent/dependent-mapper";

const returnMapper = ( data: DependentBDResponse ): DependentResponse => {
  return  DependentMapper.dependentBDToEntity(data);
}
const returnDependentMapper = ( data: Result ): Dependent => {
  return  DependentMapper.dependentByIdToEntity(data);
}


  export const getDependentByIdAction = async (idDependent:string = "''"):Promise<Dependent> => {
    try {
      const response = await vaccinesApi.get<DependentByIDResponse>(`/dependent/${idDependent}`);
     
      const { data } = response;
    const { result } = data ;

    console.log({result})
     
      return returnDependentMapper(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
     
      return ;
    }
  };
  export const getDependentByPageAction = async (limite:number =1000, page:number, term:string = "''", user:User):Promise<Dependent[]> => {
    try {
      
      let offset = page * 10;
      let desde = offset;
      if (term.length==0){
          term = "''";
      }
     
      //console.log(`/dependent/${limite}/${desde}/${term}`)
      const response = await vaccinesApi.get<DependentBDResponse>(`/dependent/${limite}/${desde}/${term}`);
      const { data } = response;
      let dependentsReuslt: Dependent[] = returnMapper(data).dependents ?? [];;
      if (user){
        dependentsReuslt = dependentsReuslt.filter((depend)=> depend.user_id == user.usuario?._id?.$oid);
      }
    
      
      return dependentsReuslt;
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