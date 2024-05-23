import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../actions/registerAction';
import { Register } from '../../infrastructure/interfaces/register-interface';
import { enviarMensajePorStatusCode } from '../screens/messages/enviarMensajePorStatusCode';
import { RootState } from '../store';
import { addErrorStore, startLoadingStore, registerStore, stopLoadingStore, removeErrorStore } from '../store/slices/register';
import { sendIsLoginStore } from '../store/slices/sendSms';
import { useSendSms } from './useSendSms';

export const useRegister = () => {
  
    const {    isLoading, resp, message
     } = useSelector((state: RootState) => state.registerStore);
     const dispatch = useDispatch();

 

    const registerData = async ( register: Register ) => {

      try {
             dispatch( startLoadingStore());
     
             const {birth, ...rest} = register;
           
            const data = await registerAction(register);
           
          
            const { statusCode, resp, message:msg} = data;
      
            if (statusCode == 401 || !resp) {
                dispatch( addErrorStore( enviarMensajePorStatusCode(statusCode)))
                return 
            }

            //Para guardrlo en el estore debe ser sin serializar.
            let birthStr:string = '';
            if (birth instanceof Date) {
                 birthStr = birth.toISOString()+' ';
               // Resto del código...
             }
         let payload = {
              register:{
                ...rest,
                birthStr,
              },
              resp,
              message:msg
          };

        
        dispatch( registerStore(payload) );
        dispatch( stopLoadingStore());
        
        //Mandamos al login
        dispatch(sendIsLoginStore());
     
      } catch (error) {
           dispatch( addErrorStore("Error: "+error));
      }
    }

    const removeMsg =  ( ) => {
          // dispatch(removeErrorStore());
          dispatch( removeErrorStore({}));
    }
    
    
    

  return {
    registerData,
    isLoading,
    resp, 
    message,
    removeMsg,
   
    }
}
