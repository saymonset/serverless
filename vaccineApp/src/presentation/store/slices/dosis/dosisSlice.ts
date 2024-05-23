import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    resp:false,
    message: '',
    desde:0,
    limite:100,
    total:0,
    dosis:[],
    dosiDetalle:{}
  };
 
export const dosisSlice = createSlice({
    name: 'dosisStore',
    initialState,
    reducers: {
        initDosis: (state, { payload } ) => {
            state.desde = 0;
            state.limite = 1000;
            state.total = 0;
            state.dosis = [];
        },
        
        loadDosis: (state, { payload } ) => {
            state.dosis = payload.dosis;
        },
        loadDosiDetalle: (state, { payload } ) => {
            state.dosiDetalle = payload.dosiDetalle;
        },
        stopDosis: (state, /* action */ ) => {
            state.isLoading = false;
        },
        startDosis: (state, /* action */ ) => {
            state.isLoading = true;
        },
    }
});
// Action creators are generated for each case reducer function
export const {   initDosis,
                 loadDosis,
                 loadDosiDetalle,
                 stopDosis,
                 startDosis
            } = dosisSlice.actions;