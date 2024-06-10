import { createSlice } from '@reduxjs/toolkit';
import { ParentescoEntity } from '../../../../domain/entities/ParentescoEntity';

const initialState = {
    name:'',
    parentescoId:'',
    isLoading: false,
    resp:false,
    message: '',
    desde:0,
    limite:100,
    total:0,
    parentescos:[] as ParentescoEntity[] ,
  };
 
export const parentescoSlice = createSlice({
    name: 'parentescoStore',
    initialState,
    reducers: {
        initParentescosResponse: (state, { payload } ) => {
            state.desde = 0;
            state.limite = 1000;
            state.total = 0;
            state.parentescos = [];
        },
        loadParentescosResponse: (state, { payload } ) => {
            state.desde = payload.desde;
            state.limite = payload.limite;
            state.total = payload.total;
            state.parentescos = payload.parentescos;
        },
        loadParentescosOnly: (state, { payload } ) => {
            state.parentescos = payload.parentescos;
        },
        stopParentescos: (state, /* action */ ) => {
            state.isLoading = false;
        },
        startParentescos: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setNameParentescoselect: (state, { payload } ) => {
            state.name = payload.name;
            state.parentescoId = payload.parentescoId;
        },
        setParentescoId: (state, { payload } ) => {
            state.parentescoId = payload.parentescoId;
        },
        setNameParentescoselectClear: (state) => {
            state.name = '';
            state.parentescoId = '';
        }
    }
});
// Action creators are generated for each case reducer function
export const {   initParentescosResponse,
                 loadParentescosResponse,
                 stopParentescos,
                 startParentescos,
                 loadParentescosOnly,
                 setNameParentescoselect,
                 setNameParentescoselectClear,
                 setParentescoId,
            } = parentescoSlice.actions;