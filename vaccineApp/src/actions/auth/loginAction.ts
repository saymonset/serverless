import { User } from '../../domain/entities/user';
import vaccinesApi from '../../config/api/vaccinesApi';
import { LoginResponse } from '../../infrastructure/interfaces/login.responses';
import { LoginMapper } from '../../infrastructure/mappers/login.mapper';


const returnUserToken = ( data: LoginResponse ) => {

  const user: User =  LoginMapper.loginResponseToEntity(data);
  return {
    user: user,
    token: data.token,
  }
}

 

export const authLogin = async (ci: string, password: string) => {
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


// export const authCheckStatus = async () => {

//   try {
//     const { data } = await vaccinesApi.get<AuthResponse>('/auth/check-status');
//     return returnUserToken(data);

//   } catch (error) {
//     console.log({error});
//     return null;
//   }

// }
