import { createSlice } from '@reduxjs/toolkit';
import {  LoginState } from '../../../interfaces'


  const initialState: LoginState = {
    email: '',
    password: '',
    isLoading: false,
    status: 'not-authenticated',
    token: '',
    message: '',
    loginResponse: null,
  };

export const loginSlice = createSlice({
    name: 'loginStore',
    initialState,
    reducers: {
        startLoadingLogin: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setLoginResponse: ( state, { payload } ) => {
            state.email = payload.email;
            state.isLoading = false;
            state.status = 'authenticated',
            state.token = payload.token,
            state.message = payload.message,
            state.loginResponse = payload.loginResponse;
        },
        logOut: ( state, { payload } ) => {
            state.email = payload.email;
            state.isLoading = false;
            state.status = payload.status,
            state.token = payload.token,
            state.message = payload.message,
            state.loginResponse = payload.loginResponse;
        },
       addError: ( state, { payload } ) =>{
                state.loginResponse = null,
                state.isLoading = false;
                state.status = 'not-authenticated',
                state.message = payload
        },
        removeError: ( state, { payload }) => {
            state.message = '';
            state.isLoading = false;
        },
    }
});
// Action creators are generated for each case reducer function
export const { startLoadingLogin, setLoginResponse, removeError,  addError,  logOut } = loginSlice.actions;