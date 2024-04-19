
import { AnyAction } from 'redux';
import vaccinesApi from '../../config/api/vaccinesApi';
import { User } from '../../domain/entities/user';
import { LoginResponse } from '../../infrastructure/interfaces/auth-vac.response';

import { STAGE, API_URL as PROD_URL, API_URL_IOS as API_URL_IOS, API_URL_ANDROID as API_URL_ANDROID, API_URL} from '@env';
const returnUserToken = ( data: LoginResponse ) => {
  const { token, resp, message, more, usuario, statusCode } = data;

 
   const user: User = {
    id: usuario._id.$oid ?? '',
    email: more.email ?? '',
    message:message ?? '',
    resp: resp ?? '',
    statusCode: statusCode ?? ''
  }
 
  return {
    user,
    token,
  }
}



export const authLogin = async (ci: string, password: string) => {
  try {
 
    const {data} = await vaccinesApi.post<LoginResponse>(`/login`,{ ci, password });
   
    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    return null;
  }
};
 


export const authCheckStatus = async (idUser:string) => {

  try {
    const { data } = await vaccinesApi.get<LoginResponse>(`/login/checkStatus/${idUser}`);
    return returnUserToken(data);

  } catch (error) {
    console.log({error});
    return null;
  }

}
