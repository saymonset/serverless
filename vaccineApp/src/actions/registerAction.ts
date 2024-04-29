import vaccinesApi from "../config/api/vaccinesApi";
import { SendSms } from "../domain/entities/SendSms";
import { Register } from "../infrastructure/interfaces/register-interface";
import { SendSMSResponse } from "../infrastructure/interfaces/sendSms.response";
import { SendSmsMapper } from "../infrastructure/mappers/sendSms.mapper";


 
  

  export const registerAction = async (register: Register) => {
    try {
       // TODO: realizar peticion http
       const response  = await vaccinesApi.post(`/users/p`,{ ...register  } );
      
        let {data} = response;
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      const data: SendSMSResponse ={}
      data['message'] =   message;
      data['resp'] =   false;
      return data;
    }
  };


 