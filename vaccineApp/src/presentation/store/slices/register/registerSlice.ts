import { createSlice } from '@reduxjs/toolkit';
import { Register } from '../../../../infrastructure/interfaces/register-interface';
import { relationShipAction } from '../../../../actions/relationShipAction';

export interface registerI {
    register:      Register;
    birthStr:string,
    isLoading: boolean;
    resp?:boolean;
    token?: string | null;
    message?: string;
  }

  const initialState: registerI= {
    register: {},
    birthStr:'',
    isLoading: false,
    resp:false,
    message: '',
  };

export const registerSlice = createSlice({
    name: 'registerStore',
    initialState,
    reducers: {
        startLoadingStore: (state, /* action */ ) => {
            state.isLoading = true;
        },
        stopLoadingStore: (state, /* action */ ) => {
            state.isLoading = false;
        },
        registerStore: (state, { payload } ) => {
            state.register = payload.register;
            state.birthStr  = payload.birthStr;
            state.message = payload.message;
            state.resp = payload.resp;
        },
        
       addErrorStore: ( state, { payload } ) =>{
                state.isLoading = false;
                state.message = payload;
                state.resp = false;
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
export const { startLoadingStore,  stopLoadingStore,
    registerStore, addErrorStore, removeErrorStore,
     } = registerSlice.actions;