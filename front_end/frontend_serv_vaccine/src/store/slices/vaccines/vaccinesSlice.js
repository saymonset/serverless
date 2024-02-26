import { createSlice } from '@reduxjs/toolkit';
import {  VaccinesResponse, LIMITE_PAGE } from '../../../interfaces';
 
 
// {
//     name:'', lastname:'', phone:'', ci:'', email:'', state:'', city:'', birth: new Date(), gender_id:'', status:true
//  }
  const initialState: VaccinesResponse = {
    isLoading: false,
    resp:false,
    message: '',
    desde:null,
    limite:100,
    total:0,
    vaccines:[],
  };



export const vaccineSlice = createSlice({
    name: 'vaccineStore',
    initialState,
    reducers: {
        initVaccinesResponse: (state, { payload } ) => {
            state.desde = null;
            state.limite = 100;
            state.total = 0;
            state.vaccines = [];
        },
        loadVaccinesResponse: (state, { payload } ) => {
            state.desde = payload.desde;
            state.limite = payload.limite;
            state.total = payload.total;
            state.vaccines = payload.vaccines;
        },
        stopVaccines: (state, /* action */ ) => {
            state.isLoading = false;
        },
        startVaccines: (state, /* action */ ) => {
            state.isLoading = true;
        }
    }
});
// Action creators are generated for each case reducer function
export const {   initVaccinesResponse,
                 loadVaccinesResponse,
                 stopVaccines,
                 startVaccines
            } = vaccineSlice.actions;