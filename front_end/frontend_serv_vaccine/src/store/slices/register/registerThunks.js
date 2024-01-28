import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingRegister, setRegisterResponse, addMessage,removeMessage, setPassword  } from './registerSlice'
import {  Register } from '../../../interfaces/register-interfaces';
import {  enviarMensajePorStatusCode } from '../../../utils/enviarMensajePorStatusCode'


export const registerThunks = ( register:Register ): AnyAction  => {
    return async ( dispatch, getState) => {

      const { token}  = register;
      try {
          dispatch( startLoadingRegister());

          if (token){
            await AsyncStorage.setItem('token', token ); 
          }
          // TODO: realizar peticion http
           const {data} = await vaccinesApi.post(`/users/p`,{ ...register  } );

          const { statusCode, body, message, resp, } = data;
          if (statusCode == 401 || !resp) {
              dispatch( addMessage(enviarMensajePorStatusCode(statusCode)))
              return 
          }
          const payload: Register = {
              ...register,
              message,
              resp
              
            };
          dispatch( setRegisterResponse(payload) );

          

           
          
      } catch (error) {
      
           dispatch( addMessage("Error: "+error))
      }
   
    }
}
 

 
export const removeErrorThunks = (dispatch): AnyAction => {
      dispatch(removeMessage());
      return
  };

  
  export const putPasswordThunks = (  password   ): AnyAction  => {
    return async ( dispatch, getState) => {
        const payload = {
              password
        };    
        dispatch( setPassword(payload) );
    }
  }
  