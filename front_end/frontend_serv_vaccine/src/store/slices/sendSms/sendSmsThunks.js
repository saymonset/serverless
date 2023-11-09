import { AnyAction } from 'redux';

import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingSms, setSmsResponse, addErrorSms,  removeErrorSms, resetSendSms, checkCode  } from './sendSmsSlice'



export const sendSmsThunks = (  phone   ): AnyAction  => {
    return async ( dispatch, getState) => {

      try {
        dispatch( startLoadingSms())
        // TODO: realizar peticion http
        
    
          let response = await vaccinesApi.post('/sendSms', { phone } );
         
          let {data} = response;
         
          //  data = {
          //    resp: true, message:'Boorrar esto mock data', statusCode:'2001'
          // }
          const { resp, message, statusCode} = data; 
           if (!resp){
            dispatch( addErrorSms("Error: "+message));
            return;
           }
           const payload = {
              phone,
              isLoading: false,
              token: '',
              message: 'Success SMS: '+message,
              response: null,
              isSendCode: true,
            };
          dispatch( setSmsResponse(payload) );
      } catch (error) {
           console.log({error});
           dispatch( addErrorSms("Error: "+error))
      }
   
    }
}




export const checkCodeThunks = (  phone, code   ): AnyAction  => {
  return async ( dispatch, getState) => {

    try {
    
      dispatch( startLoadingSms())
      // TODO: realizar peticion http
        let response = await vaccinesApi.post('/CheckCode', { phone, code } );
        let {data} = response;

        const { resp, message, token=null} = data; 
         if (!resp){
          dispatch( addErrorSms("Error: "+message));
          return;
         }

         const payload = {
            token,
            message: 'Success Code: '+message,
          };
          
        dispatch( checkCode(payload) );
       
    } catch (error) {
      console.log({error});
         dispatch( addErrorSms("Error: "+error))
    }
 
  }
}

 
export const removeErrorSmsThunks = (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch(removeErrorSms());
      resolve(); // Resolve the promise if dispatch is successful
    } catch (error) {
      reject(error); // Reject the promise if an error occurs
    }
  });
};


export const resetSendSmsThunks = (dispatch): AnyAction => {
    dispatch(resetSendSms());
    return
};

  
  