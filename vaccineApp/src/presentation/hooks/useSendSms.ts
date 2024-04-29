import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkCodeAction } from '../../actions/checkCodeAction';
import { enviarCodeAction, reEnviarCodeAction } from '../../actions/sendSmsAction';
import { CheckCode } from '../../domain/entities/CheckCode';
import { SendSms } from '../../domain/entities/SendSms';
import { SendSmsStatus } from '../../infrastructure/interfaces/sendSms.status';
import { RootState } from '../store';
import { addErrorStore, removeErrorStore, sendCodeStore, sendPhoneStore, sendRegisterStore, sendSeguridadStore, startLoadingStore,
  sendIsLoginStore } from '../store/slices/sendSms';
import { StorageAdapter } from '../../config/adapters/storage-adapter';

export const useSendSms = () => {
  
    const {  code, phone, isLoading, resp, sendSmsStatus, token, message, password
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

    
    const reEnviarCode = async (phone:string) =>{
        reEnviarCodeSendSms(phone)
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
   
    password,
    code,
    phone,
    isLoading, 
    resp, 
    sendSmsStatus, 
    token, 
    message
    }
}
