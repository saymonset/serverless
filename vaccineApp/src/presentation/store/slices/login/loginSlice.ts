import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../../domain/entities/user';
import { AuthStatus } from '../../../../infrastructure/interfaces/auth.status';
 

export interface AuthState {
    isLoading: boolean,
    status: AuthStatus;
    token?: string;
    user?: User;
    message?: string;
  }

  const initialState: AuthState = {
    isLoading: false,
    status: 'unauthenticated',
    token: undefined,
    user: undefined,
    message:'',
  };

export const loginSlice = createSlice({
    name: 'loginStore',
    initialState,
    reducers: {
        startLoginStore: (state, /* action */ ) => {
            state.status = 'checking';
            state.isLoading = true;
        },
        loginStore: ( state, { payload } ) => {
            state.status = 'authenticated';
            state.isLoading = false;
            state.user = payload.user;
            state.token = payload.token;
            state.message = '';
        },
        tokenStore: ( state, { payload } ) => {
            state.token = payload.token;
        },
        logOutStore: ( state, { payload } ) => {
            state.status = 'unauthenticated';
            state.isLoading = false;
            state.user = undefined;
            state.token = undefined;
            state.message = '';
        },
        addError: ( state, { payload } ) =>{
            state.status = 'unauthenticated';
            state.isLoading = false;
            state.user = undefined;
            state.token = undefined;
            state.message = payload
         },
        removeError: ( state, { payload }) => {
            state.message = '';
            state.isLoading = false;
        },
    }
});
// Action creators are generated for each case reducer function
export const { startLoginStore, loginStore,  logOutStore, addError, removeError, tokenStore } = loginSlice.actions;