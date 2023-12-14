import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingSms, setSmsResponse, addErrorSms,  removeErrorSms, resetSendSms, 
          checkCode, setPassword, passwordUpdate, setCi  } from './sendSmsSlice'



const enviarCode = async ( dispatch, phone, ci ) => {
 
        let response = await vaccinesApi.post('/sendSms', { phone } );
        let {data} = response;
        const { resp, message, error} = data; 
        if (!message) {
          message = error;
        }
       
         if (!resp){
          dispatch( addErrorSms("Error: "+message));
          return;
         }
         
         let payload = {
            isLoading: false,
            token: '',
            message: 'Success SMS: '+message,
            response: null,
            isSendCode: true,
            phone,
            resp
          };
        dispatch( setSmsResponse(payload) );

        //Si la cedula la trae, la guardamos en el store
        if (ci){
            let payload = {
                ci
            }
            dispatch( setCi(payload) );
        }

       
}

export const reEnviarCodeThunks = ( phone ): AnyAction => {
  return async ( dispatch, getState) => {

    try {
      dispatch( startLoadingSms());
        //  Enviamaos el codigo para recuperar password
        enviarCode( dispatch, phone );
      // // TODO: realizar peticion http
      
      //   let response = await vaccinesApi.post('/sendSms', { phone } );
      //   let {data} = response;
      //   const { resp, message, statusCode} = data; 
      //    if (!resp){
      //     dispatch( addErrorSms("Error: "+message));
      //     return;
      //    }
      //    const payload = {
      //       phone,
      //       isLoading: false,
      //       token: '',
      //       message: 'Success SMS: '+message,
      //       response: null,
      //       isSendCode: true,
      //     };
      //   dispatch( setSmsResponse(payload) );
     
    } catch (error) {
         console.log({error});
         dispatch( addErrorSms("Error: "+error))
    }
 
  }
}
export const sendSmsThunks = (  phone   ): AnyAction  => {
    return async ( dispatch, getState) => {

      try {
        dispatch( startLoadingSms())
       //  Enviaamos el codigo para recuperar password
        enviarCode( dispatch, phone );
        // // TODO: realizar peticion http
        
    
        //   let response = await vaccinesApi.post('/sendSms', { phone } );
         
        //   let {data} = response;
         
         
        //   const { resp, message, statusCode} = data; 
        //    if (!resp){
        //     dispatch( addErrorSms("Error: "+message));
        //     return;
        //    }
        //    const payload = {
        //       phone,
        //       isLoading: false,
        //       token: '',
        //       message: 'Success SMS: '+message,
        //       response: null,
        //       isSendCode: true,
        //     };
        //   dispatch( setSmsResponse(payload) );
      } catch (error) {
           console.log({error});
           dispatch( addErrorSms("Error: "+error))
      }
   
    }
}



  // El code es la cedula y con el phone chequeamos que este registrdo
export const passwordRecoveryThunks = (  phone, code   ): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
      let ci = code;
      dispatch( startLoadingSms())
      // TODO: realizar peticion http
         
        let response = await vaccinesApi.post('/CheckCode/passwordRecovery', { phone, code } );
        let {data} = response;
        const { resp, message, token=null} = data; 
         if (!resp){
              dispatch( addErrorSms("Error: "+message));
              return;
         }
        //  Enviamos el codigo para recuperar password
     
        enviarCode( dispatch, phone, ci );
       
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
            phone,
            resp
          };
          
        dispatch( checkCode(payload) );
       
    } catch (error) {
      console.log({error});
         dispatch( addErrorSms("Error: "+error))
    }
  }
}
// El code es la ci
export const changuePasswordThunks = (  password, password2, phone, code   ): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
      dispatch( startLoadingSms());

      if (password !== password2) {
          dispatch( addErrorSms("Error: "+'The password confirmation does not match'));
          return;
      }
      // TODO: realizar peticion http
        let response = await vaccinesApi.post('/CheckCode/passwordUpdate', { phone, code, password } );
        let {data} = response;

        const { resp, message} = data; 
         if (!resp){
          dispatch( addErrorSms("Error: "+message));
          return;
         }

         const payload = {
            resp,
            message: 'Success Code: '+message,
          };
          
        dispatch( passwordUpdate(payload) );
       
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

  
  