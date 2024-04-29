import vaccinesApi from "../config/api/vaccinesApi";
import { SendSms } from "../domain/entities/SendSms";
import { SendSMSResponse } from "../infrastructure/interfaces/sendSms.response";
import { SendSmsMapper } from "../infrastructure/mappers/sendSms.mapper";


const returnMapper = ( data: SendSMSResponse ): SendSms => {
    return  SendSmsMapper.sendSmsResponseToEntity(data);
  }
  

  export const enviarCodeAction = async (phone: string) => {
    try {
        let response = await vaccinesApi.post('/sendSms/new', { phone } );
        let {data} = response;
      return returnMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      const data: SendSMSResponse ={}
      data['message'] =   message;
      data['resp'] =   false;
      return returnMapper(data);
    }
  };
  export const reEnviarCodeAction = async (phone: string) => {
    try {
        let response = await vaccinesApi.post('/sendSms', { phone } );
        let {data} = response;
      return returnMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      const data: SendSMSResponse ={}
      data['message'] =   message;
      data['resp'] =   false;
      return returnMapper(data);
    }
  };


 