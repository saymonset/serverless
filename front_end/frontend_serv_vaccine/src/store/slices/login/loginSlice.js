import { createSlice } from '@reduxjs/toolkit';
import { LoginResponse } from '../../../interfaces'

interface LoginState {
    email: string;
    password: string;
    isLoading: boolean;
    loginResponse: LoginResponse | null;
  }


  const initialState: LoginState = {
    email: '',
    password: '',
    isLoading: false,
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
            state.isLoading = false;
            state.loginResponse = payload;
        }
    }
});
// Action creators are generated for each case reducer function
export const { startLoadingLogin, setLoginResponse  } = loginSlice.actions;