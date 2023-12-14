import { createSlice } from '@reduxjs/toolkit';


import {  SendSmsRequest,SendSmsPayload} from '../../../interfaces/sendsms-interface'


  const initialState: SendSmsPayload = {
    phone: '',
    isLoading: false,
    resp:false,
    token: '',
    message: '',
    response: null,
    isSendCode: false,
    ci:'',
  };

export const sendSmsSlice = createSlice({
    name: 'sendSmsStore',
    initialState,
    reducers: {
        startLoadingSms: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setSmsResponse: ( state, { payload } ) => {
            state.isLoading = false;
            state.isSendCode = true;
            state.token = '',
            state.message = payload.message,
            state.response = payload.response;
            state.phone = payload.phone;
            state.resp = payload.resp;
        },
       addErrorSms: ( state, { payload } ) =>{
                state.isLoading = false;
                state.message = payload;
                state.resp = false;
        },
        removeErrorSms: ( state, { payload }) => {
            state.message = '';
            state.isLoading = false;
            state.resp = false;
        },
        resetSendSms: ( state, { payload } ) =>  {
                state.phone = null;
                state.isLoading = false;
                state.isSendCode = false;
                state.token = '';
                state.message = '';
                state.response = '';
                state.resp = false;
        },
        checkCode: ( state, { payload } ) =>  {
            state.token = payload.token;
            state.isLoading = false;
            state.isSendCode = false;
            state.message = payload.message;
            state.phone = payload.phone;
            state.resp = payload.resp;
        },
        passwordUpdate: ( state, { payload } ) =>  {
            state.message = payload.message;
            state.resp = payload.resp;
            state.phone = null;
            state.isLoading = false;
            state.isSendCode = false;
            state.token = '';
            state.response = '';
        },
         setPassword: (state,  { payload } ) => {
            state.password = payload.password;
        },
        setCi: (state,  { payload } ) => {
            state.ci = payload.ci;
        },
        setPhone: (state,  { payload } ) => {
            state.phone = payload.phone;
        },
    }
});
// Action creators are generated for each case reducer function
export const { startLoadingSms, setSmsResponse, addErrorSms,  removeErrorSms, 
             resetSendSms, checkCode, passwordUpdate, setCi, setPhone  } = sendSmsSlice.actions;