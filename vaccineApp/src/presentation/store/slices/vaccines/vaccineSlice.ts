import { createSlice } from '@reduxjs/toolkit';
import { Vaccine } from '../../../../domain/entities/apply-vaccine-interface';

const initialState = {
    nameVaccine:'',
    vaccineId:'',
    dependentId:'',
    isLoading: false,
    resp:false,
    isShowDosis:false,
    message: '',
    desde:0,
    limite:100,
    total:0,
    vaccines:[] ,
  };
 
export const vaccineSlice = createSlice({
    name: 'vaccineStore',
    initialState,
    reducers: {
        initVaccinesResponse: (state, { payload } ) => {
            state.desde = 0;
            state.limite = 1000;
            state.total = 0;
            state.vaccines = [];
        },
        loadVaccinesResponse: (state, { payload } ) => {
            state.dependentId = payload.dependentId;
            state.desde = payload.desde;
            state.limite = payload.limite;
            state.total = payload.total;
            state.vaccines = payload.vaccines;
        },
        loadVaccinesOnly: (state, { payload } ) => {
            state.vaccines = payload.vaccines;
        },
        stopVaccines: (state, /* action */ ) => {
            state.isLoading = false;
        },
        startVaccines: (state, /* action */ ) => {
            state.isLoading = true;
        },
        showDosis: (state, { payload } ) => {
            state.isShowDosis = !payload.isShowDosis;
        },
        offDosis: (state ) => {
            state.isShowDosis = false;
        },
        setNameVaccineSelect: (state, { payload } ) => {
            state.nameVaccine = payload.nameVaccine;
            state.vaccineId = payload.vaccineId;
        },
        setVaccineId: (state, { payload } ) => {
            state.vaccineId = payload.vaccineId;
        },
        setNameVaccineSelectClear: (state) => {
            state.nameVaccine = '';
            state.vaccineId = '';
        }
    }
});
// Action creators are generated for each case reducer function
export const {   initVaccinesResponse,
                 loadVaccinesResponse,
                 stopVaccines,
                 startVaccines,
                 showDosis,
                 offDosis,
                 loadVaccinesOnly,
                 setNameVaccineSelect,
                 setNameVaccineSelectClear,
                 setVaccineId,
            } = vaccineSlice.actions;