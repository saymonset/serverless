import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../domain/entities/user';
import { AuthStatus } from '../../../infrastructure/interfaces/auth.status';


  export interface AuthState {
    status:AuthStatus,
    token?: string,
    user?:User
  };

  const initialState: AuthState = {
    status: 'not-authenticated',
    token: undefined,
    user: undefined,
    
  };

export const useAuthSlice = createSlice({
    name: 'useAuthStore',
    initialState,
    reducers: {
      startLogin: (state, /* action */ ) => {
        state.token = undefined;
        state.user = undefined;
        state.status = 'not-authenticated';
      },
        login: ( state, { payload } ) => {
            state.token = payload.token;
            state.user = payload.user;
            state.status = 'authenticated';
        },
    }
});
// Action creators are generated for each case reducer function
export const { login, startLogin } = useAuthSlice.actions;