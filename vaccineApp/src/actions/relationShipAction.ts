import vaccinesApi from "../config/api/vaccinesApi";
import { Relationship, RelationShipResponse } from "../infrastructure/interfaces/relationship";


// const returnMapper = ( data: SendSMSResponse ): SendSms => {
//     return  SendSmsMapper.sendSmsResponseToEntity(data);
//   }
  

  export const relationShipAction = async ():Promise<Relationship[] > => {
    try {
      let  { data } = await vaccinesApi.get<RelationShipResponse>(`/relationships/20/0`);
      let objs : Relationship[] = data?.relationships ?? [];
      
      return objs;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return {
        message:error,
        resp:false
      };
    }
  };


 