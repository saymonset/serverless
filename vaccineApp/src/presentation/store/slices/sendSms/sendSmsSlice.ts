import { createSlice } from '@reduxjs/toolkit';
import { SendSmsStatus } from '../../../../infrastructure/interfaces/sendSms.status';

export interface SendSmsState {
    phone:      string;
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
        } 
    }
});
// Action creators are generated for each case reducer function
export const { startLoadingStore, sendPhoneStore, sendCodeStore, 
    sendRegisterStore, addErrorStore, removeErrorStore,
    sendSeguridadStore  } = sendSmsSlice.actions;