import vaccinesApi from "../config/api/vaccinesApi";
import {  GenderElement, GenderResponse } from "../infrastructure/interfaces/gender";


// const returnMapper = ( data: SendSMSResponse ): SendSms => {
//     return  SendSmsMapper.sendSmsResponseToEntity(data);
//   }
  

  export const getGendersAction = async ():Promise<GenderElement[]> => {
    try {
      let  { data } = await vaccinesApi.get<GenderResponse>(`/genders/20/0`);
      let genders : GenderElement[] = data?.genders ?? [];
      
      return genders;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return {
        message:error,
        resp:false
      };
    }
  };


 