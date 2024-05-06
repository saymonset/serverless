import { CheckCodeResponse, User } from '../../domain/entities/user';
import vaccinesApi from '../../config/api/vaccinesApi';
import { LoginResponse } from '../../infrastructure/interfaces/login.responses';
import { LoginMapper } from '../../infrastructure/mappers/login.mapper';


const returnUserToken = ( data: LoginResponse ) => {

  const {token, usuario, more, resp, message, statusCode}: User =  LoginMapper.loginResponseToEntity(data);
  return {
    statusCode,
     token,
     usuario,
     more, 
     resp, 
     message 
  }
}
 
 

export const authLoginAction = async (ci: string, password: string):Promise<User> => {
  try {
    const {data} = await vaccinesApi.post(`/login`,{ ci, password });
    return returnUserToken(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    console.log(error);
    const data: LoginResponse ={}
    data['message'] =   message;
    data['resp'] =   false;
    return returnUserToken(data);
  }
};

// {
//   "phone":"+584142711347",
//   "code":"458066"
// }
export const authCheckStatusAction = async (phone:string, code: number):Promise<CheckCodeResponse> => {

  try {
    const { data } = await vaccinesApi.post('/CheckCode',{ phone, code });

    console.log('-------------0-------------');
    console.log({data});
    console.log('-------------1--------------');

    return data;

  } catch (error) {
    console.log({error});
    let chekCode ={
      resp:false,
      statusCode:401,
      message:error,
      token: null
    }
    return {};
  }

}
