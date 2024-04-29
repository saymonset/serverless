//import { AnyAction } from 'redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import vaccinesApi from '../../../api/vaccinesApi'
// import {   startLoadingSms, stopLoadingSms, setSmsResponse, addErrorSms,  removeErrorSms, resetSendSms, 
//           checkCode, setPassword, passwordUpdate, setCi  } from './sendSmsSlice'
// import {  enviarMensajePorStatusCode } from '../../../utils/enviarMensajePorStatusCodeenviarMensajePorStatusCode'



// const enviarCode = async ( dispatch, phone, ci ) => {
//       try {
//         let response = await vaccinesApi.post('/sendSms', { phone } );
//         let {data} = response;
//         const { resp, message, error} = data; 
//         if (!message) {
//           message = error;
//         }
       
//          if (!resp){
//           dispatch( addErrorSms("Error: "+message));
//           return;
//          }
         
//          let payload = {
//             isLoading: false,
//             token: '',
//             message: 'Success SMS: '+message,
//             response: null,
//             //En SendPhoneFigmaScreen , en un useEffect, agarramos esta 
//             //bandera para dirigirnos a la pagina donde debe escribir el odigo enviado
//             isSendCode: true,
//             phone,
//             resp
//           };
//         dispatch( setSmsResponse(payload) );

//         //Si la cedula la trae, la guardamos en el store
//         if (ci){
//             let payload = {
//                 ci
//             }
//             dispatch( setCi(payload) );
//         }
//       } catch (error) {
//            dispatch( addErrorSms("Error: "+error));
//       }
// }

// const enviarCodeFirstPrimary = async ( dispatch, phone, ci ) => {
//       try {
//         let response = await vaccinesApi.post('/sendSms/new', { phone } );
//         let {data} = response;
//         const {  message, error, resp} = data; 
//         if (!message) {
//           message = error;
//         }
       
//         //Si la respuesta es true entonces el usuario existe . Awui solo para usuarios no refgistrados
//          if (!resp){
//           dispatch( addErrorSms("Error: "+message));
//           return;
//          } 

//          // Si no existe usuario o telefono, resp = false y procedemos  a mandar codigo
//          if (resp){
//                 let payload = {
//                   isLoading: false,
//                   token: '',
//                   message: 'Success SMS: '+message,
//                   response: null,
//                   //En SendPhoneFigmaScreen , en un useEffect, agarramos esta 
//                   //bandera para dirigirnos a la pagina donde debe escribir el odigo enviado
//                   isSendCode: true,
//                   phone,
//                   resp
//                 };
//               dispatch( setSmsResponse(payload) );
//          }
          
//          dispatch( stopLoadingSms());
         
         
//       } catch (error) {
//            dispatch( addErrorSms("Error: "+error));
//       }
// }

// export const reEnviarCodeThunks = ( phone ): AnyAction => {
//   return async ( dispatch, getState) => {

//     try {
//       dispatch( startLoadingSms());
//         //  Enviamaos el codigo para recuperar password
//         enviarCode( dispatch, phone );
//     } catch (error) {
//          console.error({error});
//          dispatch( addErrorSms("Error: "+error))
//     }
 
//   }
// }
// export const sendSmsThunks = (  phone   ): AnyAction  => {
//     return async ( dispatch, getState) => {
//       try {
//         dispatch( startLoadingSms())
//        //  Enviaamos el codigo para recuperar password
//         enviarCode( dispatch, phone );
//       } catch (error) {
//            console.error({error});
//            dispatch( addErrorSms("Error: "+error))
//       }
//     }
// }

// export const sendSmsFirstPrimaryThunks = (  phone   ): AnyAction  => {
//   return async ( dispatch, getState) => {
//     try {
//       dispatch( startLoadingSms())
//      //  Enviaamos el codigo para recuperar password
//      enviarCodeFirstPrimary( dispatch, phone );
//     } catch (error) {
//          console.error({error});
//          dispatch( addErrorSms("Error: "+error))
//     }
//   }
// }

//   // El code es la cedula y con el phone chequeamos que este registrdo
// export const passwordRecoveryThunks = (  phone, code   ): AnyAction  => {
//   return async ( dispatch, getState) => {
//     try {
//       let ci = code;
//       dispatch( startLoadingSms())
//       // TODO: realizar peticion http
         
//         let response = await vaccinesApi.post('/CheckCode/passwordRecovery', { phone, code } );
//         let {data} = response;
//         const { resp, statusCode} = data; 
//          if (!resp){
//               dispatch( addErrorSms(enviarMensajePorStatusCode(statusCode+"")))
//               return;
//          }
//         //  Enviamos el codigo para recuperar password
//         enviarCode( dispatch, phone, ci );
       
//     } catch (error) {
//       console.error({error});
//          dispatch( addErrorSms("Error: "+error))
//     }
//   }
// }
// export const checkCodeThunks = (  phone, code   ): AnyAction  => {
//   return async ( dispatch, getState) => {
//     try {
//       dispatch( startLoadingSms())
//       // TODO: realizar peticion http
//         let response = await vaccinesApi.post('/CheckCode', { phone, code } );
//         let {data} = response;

//         const { resp, message, token=null} = data; 
//          if (!resp){
//           dispatch( addErrorSms("Error: "+message));
//           return;
//          }

//          const payload = {
//             token,
//             message: 'Success Code: '+message,
//             //En SendCodeFigmaScreen en un effect con el token nos dirigimos de manera automatica a  SeguridadFigmaScreen
//             phone,
//             resp
//           };
          
//         dispatch( checkCode(payload) );
       
//     } catch (error) {
//       console.error({error});
//          dispatch( addErrorSms("Error: "+error))
//     }
//   }
// }
// // El code es la ci
// export const changuePasswordThunks = (  password, password2, phone, code   ): AnyAction  => {
//   return async ( dispatch, getState) => {
//     try {
//       dispatch( startLoadingSms());

//       if (password !== password2) {
//         let statusCode='passworddoesnotmatch'
//           dispatch( addErrorSms(enviarMensajePorStatusCode(statusCode)))
//           return;
//       }
//       // TODO: realizar peticion http
//         let response = await vaccinesApi.post('/CheckCode/passwordUpdate', { phone, code, password } );
//         let {data} = response;

//         const { resp, message, statusCode} = data; 
//          if (!resp){
//           dispatch( addErrorSms("Error: "+message));
//           return;
//          }

//          //statusCode = "successPassword";
//          const payload = {
//             resp,
//             message: enviarMensajePorStatusCode(statusCode+''),
//           };
          
//         dispatch( passwordUpdate(payload) );
       
//     } catch (error) {
//       console.error({error});
//          dispatch( addErrorSms("Error: "+error))
//     }
//   }
// }



 
// export const removeErrorSmsThunks = (dispatch) => {
//   return new Promise((resolve, reject) => {
//     try {
//       dispatch(removeErrorSms());
//       resolve(); // Resolve the promise if dispatch is successful
//     } catch (error) {
//       reject(error); // Reject the promise if an error occurs
//     }
//   });
// };


// export const resetSendSmsThunks = (dispatch): AnyAction => {
//     dispatch(resetSendSms());
//     return
// };

  
  