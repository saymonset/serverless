import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkCodeAction, passwordRecoveryAction, passwordUpdateAction } from '../../actions/checkCodeAction';
import { enviarCodeAction, reEnviarCodeAction } from '../../actions/sendSmsAction';
import { CheckCode } from '../../domain/entities/CheckCode';
import { SendSms } from '../../domain/entities/SendSms';
import { SendSmsStatus } from '../../infrastructure/interfaces/sendSms.status';
import { RootState } from '../store';
import { addErrorStore, removeErrorStore, sendCodeStore, sendPhoneStore, sendRegisterStore, sendSeguridadStore, startLoadingStore,
  sendIsLoginStore, 
  clearSendSmsStatusStore,
  ciPhoneStore,
  passwordUpdate} from '../store/slices/sendSms';
import { StorageAdapter } from '../../config/adapters/storage-adapter';
import { enviarMensajePorStatusCode } from '../screens/messages/enviarMensajePorStatusCode';

export const useSendSms = () => {
  
    const {  code, phone, ci, isLoading, resp, sendSmsStatus, token, message, password
     } = useSelector((state: RootState) => state.sendSmsStore);

     const dispatch = useDispatch();
     
     const sendSmsPhone = async () => {
       dispatch(sendPhoneStore({}));
     }

     const sendSmsCode = async (phone:string) => {
       let payload = {
         phone
       }
       dispatch(sendCodeStore(payload));
    }

    const sendSmsRegister = async (token:string) => {
      let payload = {
        token
      }
      dispatch(sendRegisterStore(payload));
    }

    const removeError = () =>{
      
      dispatch(removeErrorStore({}));
    }


    const enviarCodeSendSms = async ( phone: string ) => {
      try {
        dispatch( startLoadingStore());
        let data: SendSms =  await enviarCodeAction(phone);
       
        let { resp, message, last_code:code} = data; 
        if (!message) {
             message = '';
        }
         if (!resp){
          dispatch( addErrorStore("Error: "+message));
          return;
         }
         let payload = {
            code,
            phone,
            resp
          };
        dispatch( sendCodeStore(payload) );
       
      } catch (error) {
           dispatch( addErrorStore("Error: "+error));
      }
    }

    const reEnviarCodeSendSms = async ( phone: string ) => {
      try {
        dispatch( startLoadingStore());
        let data: SendSms =  await reEnviarCodeAction(phone);
       
        let { resp, message, last_code:code} = data; 
        if (!message) {
             message = '';
        }
         if (!resp){
          dispatch( addErrorStore("Error: "+message));
          return;
         }
         let payload = {
            code,
            phone,
            resp
          };
        dispatch( sendCodeStore(payload) );
       
      } catch (error) {
           dispatch( addErrorStore("Error: "+error));
      }
    }


    const checkCode = async ( phone: string, code: string ) => {
      try {
        dispatch( startLoadingStore());
          let data: CheckCode =  await checkCodeAction(phone, code);
          let { resp, message, token} = data; 
          if (!message) {
               message = '';
          }
           if (!resp){
            dispatch( addErrorStore("Error: "+message));
            return;
           }
           let payload = {
              token,
              phone,
              resp
            };
          dispatch( sendSeguridadStore(payload) );
         await StorageAdapter.setItem('token', token ?? '');
      } catch (error) {
           dispatch( addErrorStore("Error: "+error));
           StorageAdapter.removeItem('token');
      }
    }
    const putPassword = async ( password: string ) => {
      try {
        dispatch( startLoadingStore());
           
           let payload = {
              password
            };
          dispatch( sendRegisterStore(payload) );
      } catch (error) {
           dispatch( addErrorStore("Error: "+error));
      }
    }

    const passwordRecovery = async ( phone: string, ci: string ) => {
      try {
        dispatch( startLoadingStore());
        let data: CheckCode =  await passwordRecoveryAction(phone, ci);
        let { resp, message, token} = data; 
        if (!message) {
             message = '';
        }
         if (!resp){
          dispatch( addErrorStore("Error: "+message));
          return;
         }
         /* El code es el lastCode que obtenemos de bd pero solo se hace al momento de registrar el usuario por primera vez */
         /* Aqui es undefined porque estamos recuperando password */
         let payload = {
            token,
            phone,
            ci,
            code:undefined,
            resp
          };
        dispatch( ciPhoneStore(payload) );
        dispatch( sendCodeStore(payload) );
        await StorageAdapter.setItem('token', token ?? '');
            
      } catch (error) {
           dispatch( addErrorStore("Error: "+error));
      }
    }

    const clearSendSmsStatus = () =>{
         dispatch(clearSendSmsStatusStore({}));

    }

    const changuePassword = async( phone:string, code:string, password:string ) => {

      try {
        dispatch( startLoadingStore());
        let data: CheckCode =  await passwordUpdateAction(phone, code, password);
        let { resp, message, token, statusCode} = data; 
        if (!message) {
             message = '';
        }
         if (!resp){
          dispatch( addErrorStore("Error: "+message));
          return;
         }
         
         const payload = {
          resp,
          message: enviarMensajePorStatusCode(statusCode+''),
        };
        
         dispatch( passwordUpdate(payload) );
            
      } catch (error) {
           dispatch( addErrorStore("Error: "+error));
      }

    }
    
    const reEnviarCode = async (phone:string | undefined) =>{
      if (phone ){
        reEnviarCodeSendSms(phone)
      }
        
    }

  return {
    sendSmsPhone,
    sendSmsCode,
    sendSmsRegister,
    enviarCodeSendSms,
    removeError,
    reEnviarCode,
    checkCode,
    putPassword,
    passwordRecovery,
    clearSendSmsStatus,
    changuePassword,
   
    password,
    code,
    ci,
    phone,
    isLoading, 
    resp, 
    sendSmsStatus, 
    token, 
    message
    }
}
