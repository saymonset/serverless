import { AnyAction } from 'redux';
import {  enviarMensajePorStatusCode } from '../../../utils/enviarMensajePorStatusCode'

import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingLogin, setLoginResponse, removeError, addError, logOut  } from './loginSlice'
import {  LoginState } from '../../../interfaces'



export const loginThunks = ( email, password ): AnyAction  => {
    return async ( dispatch, getState) => {
      try {
        //  dispatch( removeError())
          dispatch( startLoadingLogin())

          // TODO: realizar peticion http
          const {data} = await vaccinesApi.post(`/login/mail`,{ email, password });
          const { statusCode, body, token } = data;

          if (statusCode == 401) {
              dispatch( addError("Error: "+body))
              return 
          }

          // if (token){
          //   await AsyncStorage.setItem('token', token ); 
          // }

          const payload: LoginState = {
              email,
              password,
              isLoading: false,
              status: 'authenticated',
              token,
              message: '',
              loginResponse: data,
            };
          dispatch( setLoginResponse(payload) );
          
      } catch (error) {
           dispatch( addError("Error: "+error))
      }
    }
}

export const loginCiThunks = ( ci, password ): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
        dispatch( startLoadingLogin())

        const {data} = await vaccinesApi.post(`/login`,{ ci, password });
        
        const { token, resp, message, more, usuario } = data;
    
        if (!usuario){
         //dispatch( addError("Error: "+message))
         let  statusCode = "401";
          dispatch( addError(enviarMensajePorStatusCode(statusCode)))
          return;
        }
        const { _id } = usuario;
        const { $oid:user_id } = _id;
         
        

        if ( !resp) {
            dispatch( addError("Error: "+message))
            return 
        }

      
        const payload: LoginState = {
            email:more?.email,
            isLoading: false,
            status: 'authenticated',
            token,
            message: '',
            user_id,
            usuario,
          };

        dispatch( setLoginResponse(payload) );
        
    } catch (error) {
         dispatch( addError("Error: "+error))
    }
  }
}


export const logoutThunks = ( ): AnyAction  => {
  return async ( dispatch, getState) => {

    try {

        dispatch( startLoadingLogin())
        const payload: LoginState = {
            email:'',
            password:'',
            isLoading: false,
            status: 'not-authenticated',
            token: '',
            message: '',
            loginResponse: null,
          };
        dispatch( logOut(payload) );
    } catch (error) {
         dispatch( addError("Error: "+error))
    }
 
  }
}

 
export const removeErrorThunks = (dispatch): AnyAction => {
      dispatch(removeError());
      return
  };
  