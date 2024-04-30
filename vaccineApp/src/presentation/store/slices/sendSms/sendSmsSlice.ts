import { createSlice } from '@reduxjs/toolkit';
import { SendSmsStatus } from '../../../../infrastructure/interfaces/sendSms.status';

export interface SendSmsState {
    phone?:      string;
    ci?: string,
    code?:      string;
    isLoading: boolean;
    resp?:boolean;
    sendSmsStatus: SendSmsStatus;
    token?: string | null;
    message?: string;
    password?:string;
    
    
  }

  const initialState: SendSmsState = {
    phone: '',
    ci:'',
    code:undefined,
    isLoading: false,
    resp:false,
    sendSmsStatus:'',
    token: '',
    message: '',
    password:'',
  };

export const sendSmsSlice = createSlice({
    name: 'sendSmsStore',
    initialState,
    reducers: {
        startLoadingStore: (state, /* action */ ) => {
            state.isLoading = true;
        },
        sendPhoneStore: (state, { payload } ) => {
            state.sendSmsStatus = 'isPhone';
            state.isLoading = false;
        },
        sendCodeStore: (state, { payload } ) => {
            state.sendSmsStatus = 'isCode';
            state.phone = payload.phone;
            state.code = payload.code;
            state.isLoading = false;
        },
        ciPhoneStore: (state, { payload } ) => {
            state.phone = payload.phone;
            state.ci = payload.ci;
        },
        sendSeguridadStore: (state, { payload } ) => {
            state.sendSmsStatus = 'isSeguridad';
            state.token = payload.token;
            state.isLoading = false;
        },
        sendRegisterStore: (state, { payload } ) => {
            state.sendSmsStatus = 'isRegister';
            state.password = payload.password;
            state.isLoading = false;
        },
        sendIsLoginStore: (state) => {
            state.sendSmsStatus = 'isLogin';
            state.isLoading = false;
        },
        
       addErrorStore: ( state, { payload } ) =>{
                state.isLoading = false;
                state.message = payload;
                state.resp = false;
                state.isLoading = false;
        },
        removeErrorStore: ( state, { payload }) => {
            state.message = '';
            state.isLoading = false;
            state.resp = false;
            state.isLoading = false;
        },
        passwordUpdate: ( state, { payload } ) =>  {
            //state.sendSmsStatus = 'isLogin';
            state.message = payload.message;
            state.resp = payload.resp;
            state.token = '';
            state.isLoading = false;
            state.phone = '';
            state.ci = '';
            state.code = '';
        },
        clearSendSmsStatusStore: ( state, { payload }) => {
            state.sendSmsStatus = '';
            state.phone = '';
            state.ci = '';
            state.code = '';
            state.isLoading = false;
            state.resp = false;
            state.message = '';
        } 
    }
});
// Action creators are generated for each case reducer function
export const { startLoadingStore, sendPhoneStore, sendCodeStore, 
    sendRegisterStore, addErrorStore, removeErrorStore,
    sendSeguridadStore, sendIsLoginStore, clearSendSmsStatusStore, ciPhoneStore,
    passwordUpdate  } = sendSmsSlice.actions;