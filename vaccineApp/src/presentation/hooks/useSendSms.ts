import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkCodeAction } from '../../actions/checkCodeAction';
import { enviarCode } from '../../actions/sendSmsAction';
import { CheckCode } from '../../domain/entities/CheckCode';
import { SendSms } from '../../domain/entities/SendSms';
import { SendSmsStatus } from '../../infrastructure/interfaces/sendSms.status';
import { RootState } from '../store';
import { addErrorStore, removeErrorStore, sendCodeStore, sendPhoneStore, sendRegisterStore, startLoadingStore } from '../store/slices/sendSms';

export const useSendSms = () => {
  
    const {  code, phone, isLoading, resp, sendSmsStatus, token, message
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
        let data: SendSms =  await enviarCode(phone);
       
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
          dispatch( sendRegisterStore(payload) );

         

      
      } catch (error) {
           dispatch( addErrorStore("Error: "+error));
      }
    }

    const reEnviarCode = async (phone:string) =>{
        enviarCodeSendSms(phone)
    }

  return {
    sendSmsPhone,
    sendSmsCode,
    sendSmsRegister,
    enviarCodeSendSms,
    removeError,
    reEnviarCode,
    checkCode,
    code,
    phone,
    isLoading, 
    resp, 
    sendSmsStatus, 
    token, 
    message
    }
}
