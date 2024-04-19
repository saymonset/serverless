import { AnyAction } from 'redux';
import { authCheckStatus, authLogin } from '../../../actions/auth/auth';
import { API_URL } from '../../../config/api/vaccinesApi';
import { User } from '../../../domain/entities/user';
import { login, startLogin } from './useAuthSlice';
  

export const loginCiThunks = ( ci:string, password:string ): Promise<Boolean>  => {
  return async ( dispatch, getState) => {
    try {
        dispatch( startLogin())
        const {user, token} =  await  authLogin(ci, password);
        console.log('-----------1------');
        console.log({user, token});
       
        console.log('-----2------------');
              const payload = {
                token ,
                user 
                };
        dispatch( login(payload) );
        return true;
    } catch (error) {
      console.log({error})
      return false;
    }
  }
}

export const authCheckStatusThunks = ( user: User): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
        dispatch( startLogin())
        const {user, token} =  await  authCheckStatus(user['id']);
        console.log('-----------3------');
        console.log({user, token});
        console.log('-----4------------');
              const payload = {
                token ,
                user 
                };
        dispatch( login(payload) );
    } catch (error) {
      console.log({error})
    }
  }
}
 
export const removeErrorThunks = (dispatch): AnyAction => {
      // dispatch(removeError());
      // return
  };
  