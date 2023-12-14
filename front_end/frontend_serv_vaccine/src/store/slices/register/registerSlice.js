import { createSlice } from '@reduxjs/toolkit';
import {  Register } from '../../../interfaces/register-interfaces';
 

  const initialState: Register = {
    name: '',
    lastname: '',
    password:'',
    ci: '',
    email:'',
    state:'',
    city:'',
    birth:'',
    gender_id:'',
    isLoading: false,
    status: 'not-authenticated',
    token: '',
    message: '',
    resp: false,
  };

export const registerSlice = createSlice({
    name: 'registerStore',
    initialState,
    reducers: {
        startLoadingRegister: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setRegisterResponse: ( state, { payload } ) => {
            state.name = payload.name;
            state.lastname = payload.lastname;
            state.password = payload.password;
            state.ci = payload.ci;
            state.email = payload.email;
            state.state = payload.state;
            state.city = payload.city;
            state.birth = payload.birth;
            state.gender_id = payload.gender_id;
            state.isLoading = false;
            state.status = 'authenticated';
            state.token = payload.token;
            state.message = payload.message;
            state.resp = payload.resp;
        },
       addMessage: ( state, { payload } ) =>{
                state.isLoading = false;
                state.message = payload
        },
        removeMessage: ( state, { payload }) => {
            state.message = '';
            state.isLoading = false;
        },
        setPassword: (state,  { payload } ) => {
           state.password = payload.password;
       },
    }
});
// Action creators are generated for each case reducer function
export const { startLoadingRegister, setRegisterResponse, addMessage, removeMessage, setPassword } = registerSlice.actions;