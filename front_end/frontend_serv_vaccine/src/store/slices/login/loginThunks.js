import { AnyAction } from 'redux';

import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingLogin, setLoginResponse, removeError, addError  } from './loginSlice'
import {  LoginState } from '../../../interfaces'



export const loginThunks = ( email, password ): AnyAction  => {
    return async ( dispatch, getState) => {

      try {
          dispatch( removeError())
          dispatch( startLoadingLogin())

          // TODO: realizar peticion http
          const {data} = await vaccinesApi.post(`/login/mail`,{ email, password });
          const { statusCode, body } = data;

          if (statusCode == 401) {
              dispatch( addError("Error: "+body))
              return 
          }
          const payload: LoginState = {
              email,
              password,
              isLoading: false,
              status: 'authenticated',
              token: '',
              message: 'Success Login',
              loginResponse: data,
            };
          dispatch( setLoginResponse(payload) );
      } catch (error) {
           dispatch( addError("Error: "+error))
      }
   
    }
}

 
export const removeErrorThunks = (): AnyAction => {
    return (dispatch, getState) => {
      dispatch(removeError);
    };
  };
  