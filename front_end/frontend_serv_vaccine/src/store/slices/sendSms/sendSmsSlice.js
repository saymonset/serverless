import { createSlice } from '@reduxjs/toolkit';


import {  SendSmsRequest,SendSmsPayload} from '../../../interfaces/sendsms-interface'


  const initialState: SendSmsPayload = {
    phone: '',
    isLoading: false,
    token: '',
    message: '',
    response: null,
    isSendCode: false
  };

export const sendSmsSlice = createSlice({
    name: 'sendSmsStore',
    initialState,
    reducers: {
        startLoadingSms: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setSmsResponse: ( state, { payload } ) => {
            state.phone = payload.phone;
            state.isLoading = false;
            state.isSendCode = true;
            state.token = '',
            state.message = payload.message,
            state.response = payload.response;
        },
       addErrorSms: ( state, { payload } ) =>{
               // state.phone = null;
                state.isLoading = false;
                state.isSendCode = false;
               //state.token = '';
                state.message = payload;
                //state.response = '';
        },
        removeErrorSms: ( state, { payload }) => {
            state.message = '';
            state.isLoading = false;
        },
        resetSendSms: ( state, { payload } ) =>  {
                state.phone = null;
                state.isLoading = false;
                state.isSendCode = false;
                state.token = '';
                state.message = '';
                state.response = '';
        },
        checkCode: ( state, { payload } ) =>  {
            state.token = payload.token;
            state.isLoading = false;
            state.isSendCode = false;
            state.message = payload.message;
        }
    }
});
// Action creators are generated for each case reducer function
export const { startLoadingSms, setSmsResponse, addErrorSms,  removeErrorSms, resetSendSms, checkCode  } = sendSmsSlice.actions;