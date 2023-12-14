import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingRegister, setRegisterResponse, addMessage,removeMessage, setPassword  } from './registerSlice'
import {  Register } from '../../../interfaces/register-interfaces';
import {  useSelector } from 'react-redux';


export const registerThunks = ( register:Register ): AnyAction  => {
    return async ( dispatch, getState) => {

      const { token}  = register;
   

      console.log({token})

      console.log('pasando por el trunk regstrer create--todo----')

      try {
          dispatch( startLoadingRegister());

          if (token){
            await AsyncStorage.setItem('token', token ); 
          }
          console.log('------------------1------------------')
          console.log({ register })
          // TODO: realizar peticion http
           const {data} = await vaccinesApi.post(`/users/p`,{ ...register  } );

           console.log('------------------2------------------')
         
       
          const { statusCode, body, message, resp, } = data;
          console.log('------------------3------------------')
          console.log({data});
          console.log('------------------24------------------')

           console.log({statusCode});
          if (statusCode == 401 || !resp) {
              dispatch( addMessage("Error: "+JSON.stringify(data)))
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
  