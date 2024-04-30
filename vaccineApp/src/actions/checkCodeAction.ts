import vaccinesApi from "../config/api/vaccinesApi";
import { CheckCode } from "../domain/entities/CheckCode";
import { SendSms } from "../domain/entities/SendSms";
import { CheckCodeResponse } from "../infrastructure/interfaces/checkCode.response";
import { SendSMSResponse } from "../infrastructure/interfaces/sendSms.response";
import { CheckCodeMapper } from "../infrastructure/mappers/checkCode.mapper";
import { SendSmsMapper } from "../infrastructure/mappers/sendSms.mapper";


const returnMapper = ( data: CheckCodeResponse ): CheckCode => {
    return  CheckCodeMapper.checkCodeResponseToEntity(data);
  }
  

  export const checkCodeAction = async (phone: string, code: string)  => {
    try {
        let response = await vaccinesApi.post('/CheckCode', { phone, code } );
        let {data} = response;
      return returnMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      const data: CheckCodeResponse ={}
      data['message'] =   message;
      data['resp'] =   false;
      return returnMapper(data);
    }
  };


  export const passwordRecoveryAction = async (phone: string, code: string)  => {
    try {
        let response = await vaccinesApi.post('/CheckCode/passwordRecovery', { phone, code } );
        let {data} = response;
       
      return returnMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      const data: CheckCodeResponse ={}
      data['message'] =   message;
      data['resp'] =   false;
      return returnMapper(data);
    }
  };
  export const passwordUpdateAction = async (phone: string, code: string, password:string)  => {
    try {
        let response = await vaccinesApi.post('/CheckCode/passwordUpdate', { phone, code, password } );
        let {data} = response;
       
      return returnMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      const data: CheckCodeResponse ={}
      data['message'] =   message;
      data['resp'] =   false;
      return returnMapper(data);
    }
  };